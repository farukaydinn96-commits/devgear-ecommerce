const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const calcOrderPrices = (orderItems = []) => {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error('Order must contain at least one item');
  }

  const rawItemsPrice = orderItems.reduce((acc, item) => {
    const price = Number(item.price);
    const qty = Number(item.qty);
    if (!Number.isFinite(price) || price < 0 || !Number.isInteger(qty) || qty <= 0) {
      throw new Error('Invalid item price or quantity');
    }
    return acc + price * qty;
  }, 0);

  const itemsPrice = addDecimals(rawItemsPrice);
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 10);
  const taxPrice = addDecimals(0.15 * Number(itemsPrice));
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  return {
    itemsPrice: Number(itemsPrice),
    shippingPrice: Number(shippingPrice),
    taxPrice: Number(taxPrice),
    totalPrice: Number(totalPrice)
  };
};

export const canAccessOrder = (order, user) => {
  if (!order || !user) return false;
  if (user.isAdmin) return true;
  const ownerId = order.user?._id ? String(order.user._id) : String(order.user);
  return ownerId === String(user._id);
};
