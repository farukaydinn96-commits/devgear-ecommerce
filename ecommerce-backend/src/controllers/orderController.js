import Order from '../models/orderModel.js';

// @desc    Yeni sipariş oluştur
// @route   POST /api/orders
// @access  Private (Sadece giriş yapmış kullanıcılar)
export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Sepette ürün yoksa hata döndür
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'Siparişinizde ürün bulunmamaktadır' });
    return;
  } else {
    // Yeni siparişi hazırla
    const order = new Order({
      user: req.user._id, // Giriş yapan kullanıcının ID'sini otomatik ekler (protect sayesinde)
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Veritabanına kaydet
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};
// @desc    Giriş yapan kullanıcının kendi siparişlerini getir
// @route   GET /api/orders/mine
// @access  Private
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// @desc    ID'ye göre sipariş detaylarını getir
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  // populate: Siparişi getirerken, siparişi veren kullanıcının veritabanındaki adını ve emailini de içine dahil eder
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Sipariş bulunamadı' });
  }
};
// @desc    Siparişi 'Teslim Edildi' (Delivered) olarak güncelle
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Sipariş bulunamadı' });
  }
};

// @desc    Sistemdeki tüm siparişleri getir
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  // populate ile siparişi veren kullanıcının sadece ID ve isim bilgisini de ekliyoruz
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
};