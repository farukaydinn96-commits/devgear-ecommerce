import test from 'node:test';
import assert from 'node:assert/strict';
import products from '../src/data/products.js';
import { calcOrderPrices, canAccessOrder } from '../src/utils/calcPrices.js';
import { admin } from '../src/middlewares/authMiddleware.js';

test('1. Catalog dataset contains 24 hardware items with valid positive prices', () => {
  assert.equal(products.length, 24);
  for (const item of products) {
    assert.ok(item.name && item.name.length > 2);
    assert.ok(Number(item.price) > 0);
    assert.ok(Number(item.countInStock) >= 0);
  }
});

test('2. calcOrderPrices (real server utility) computes subtotal, free shipping >$100, and 15% tax', () => {
  const highValue = calcOrderPrices([
    { price: 199.0, qty: 1 },
    { price: 50.0, qty: 2 }
  ]);
  assert.equal(highValue.itemsPrice, 299.0);
  assert.equal(highValue.shippingPrice, 0.0);
  assert.equal(highValue.taxPrice, 44.85);
  assert.equal(highValue.totalPrice, 343.85);

  const lowValue = calcOrderPrices([{ price: 49.0, qty: 1 }]);
  assert.equal(lowValue.itemsPrice, 49.0);
  assert.equal(lowValue.shippingPrice, 10.0);
  assert.equal(lowValue.taxPrice, 7.35);
  assert.equal(lowValue.totalPrice, 66.35);
});

test('3. calcOrderPrices rejects negative prices or zero quantities', () => {
  assert.throws(() => calcOrderPrices([]), /at least one item/);
  assert.throws(() => calcOrderPrices([{ price: -10, qty: 1 }]), /Invalid item price/);
  assert.throws(() => calcOrderPrices([{ price: 100, qty: 0 }]), /Invalid item price/);
});

test('4. canAccessOrder enforces order ownership and admin override (prevents IDOR)', () => {
  const sampleOrder = { user: { _id: 'user-111' } };
  const ownerUser = { _id: 'user-111', isAdmin: false };
  const otherUser = { _id: 'user-222', isAdmin: false };
  const adminUser = { _id: 'admin-999', isAdmin: true };

  assert.equal(canAccessOrder(sampleOrder, ownerUser), true);
  assert.equal(canAccessOrder(sampleOrder, otherUser), false);
  assert.equal(canAccessOrder(sampleOrder, adminUser), true);
});

test('5. admin middleware returns 403 Forbidden for non-admin users', () => {
  let statusCode = 200;
  let body = null;
  let nextCalled = false;
  const res = {
    status(c) {
      statusCode = c;
      return this;
    },
    json(p) {
      body = p;
      return this;
    }
  };

  admin({ user: { _id: 'u1', isAdmin: false } }, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(statusCode, 403);
  assert.match(body.message, /Admin privileges required/);
});
