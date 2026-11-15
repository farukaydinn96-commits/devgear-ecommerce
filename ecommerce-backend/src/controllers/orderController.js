import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import redisClient from '../config/redis.js';
import { calcOrderPrices, canAccessOrder } from '../utils/calcPrices.js';

export const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items in cart' });
  }

  const decrementedItems = [];

  try {
    const verifiedItems = [];

    for (const clientItem of orderItems) {
      const qty = Number(clientItem.qty);
      if (!Number.isInteger(qty) || qty <= 0) {
        throw Object.assign(new Error('Invalid item quantity'), { statusCode: 400 });
      }

      const productId = String(clientItem.product || clientItem._id || '');
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: productId, countInStock: { $gte: qty } },
        { $inc: { countInStock: -qty } },
        { new: true }
      );

      if (!updatedProduct) {
        throw Object.assign(
          new Error(`Insufficient stock or product not found for: ${clientItem.name || productId}`),
          { statusCode: 400 }
        );
      }

      decrementedItems.push({ productId: updatedProduct._id, qty });
      verifiedItems.push({
        name: updatedProduct.name,
        qty,
        image: updatedProduct.image,
        price: updatedProduct.price,
        product: updatedProduct._id
      });
    }

    const { taxPrice, shippingPrice, totalPrice } = calcOrderPrices(verifiedItems);

    const order = new Order({
      user: req.user._id,
      orderItems: verifiedItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Simulated Stripe Test Mode',
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();
    if (redisClient?.isOpen) await redisClient.del('products:all:v3');

    return res.status(201).json(createdOrder);
  } catch (error) {
    // Rollback any decremented stock if a subsequent item failed validation
    for (const item of decrementedItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { countInStock: item.qty }
      }).catch(() => {});
    }
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (!canAccessOrder(order, req.user)) {
      return res.status(403).json({ message: 'Forbidden: You do not own this order' });
    }
    return res.json(order);
  } catch {
    return res.status(404).json({ message: 'Order not found' });
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (!canAccessOrder(order, req.user)) {
      return res.status(403).json({ message: 'Forbidden: You cannot pay for another user order' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: String(req.body?.id || `sim_stripe_${Date.now()}`),
      status: String(req.body?.status || 'COMPLETED'),
      update_time: String(Date.now()),
      email_address: String(req.user.email || 'customer@devgear.com')
    };
    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email');
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
