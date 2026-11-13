import test from 'node:test';
import assert from 'node:assert/strict';
import products from '../src/data/products.js';

test('Catalog contains 24 developer hardware items with valid prices and ratings', () => {
  assert.equal(products.length, 24);
  for (const item of products) {
    assert.ok(item.name.length > 3);
    assert.ok(item.price > 0);
    assert.ok(item.rating >= 4.0 && item.rating <= 5.0);
    assert.ok(item.numReviews > 0);
  }
});

test('Order pricing calculation applies free shipping above $100 and 15% tax', () => {
  const calcOrderTotals = (cartItems) => {
    const itemsPrice = Number(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));
    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
  };
  const highOrder = calcOrderTotals([{ price: 200, qty: 2 }]);
  assert.equal(highOrder.shippingPrice, 0);
  assert.equal(highOrder.totalPrice, 460);
});
