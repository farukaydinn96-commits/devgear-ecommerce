import test from 'node:test';
import assert from 'node:assert/strict';
import products from '../src/data/products.js';
import { calcOrderPrices, canAccessOrder } from '../src/utils/calcPrices.js';
import { admin } from '../src/middlewares/authMiddleware.js';
import {
  checkAuthRateLimit,
  resetAuthBuckets,
  validateCredentialsInput,
  validateReviewInput
} from '../src/utils/security.js';
import { errorHandler } from '../src/middlewares/errorMiddleware.js';

const mockRes = () => ({
  statusCode: 200,
  body: null,
  status(c) {
    this.statusCode = c;
    return this;
  },
  json(p) {
    this.body = p;
    return this;
  }
});

test('1. Catalog dataset contains 24 hardware items synced with frontend prices and names', () => {
  assert.equal(products.length, 24);
  assert.ok(products.some((p) => p.name.includes('Sony WH-1000XM4')));
  assert.ok(products.some((p) => p.name.includes('Lumix G9')));
});

test('2. calcOrderPrices computes subtotal, free shipping >$100, and 15% tax', () => {
  const res = calcOrderPrices([{ price: 200, qty: 1 }]);
  assert.equal(res.itemsPrice, 200);
  assert.equal(res.shippingPrice, 0);
  assert.equal(res.taxPrice, 30);
  assert.equal(res.totalPrice, 230);
});

test('3. calcOrderPrices charges $10 shipping for orders <= $100', () => {
  const res = calcOrderPrices([{ price: 50, qty: 1 }]);
  assert.equal(res.shippingPrice, 10);
  assert.equal(res.totalPrice, 67.5);
});

test('4. calcOrderPrices rejects empty carts, negative prices, or invalid quantities', () => {
  assert.throws(() => calcOrderPrices([]), /at least one item/);
  assert.throws(() => calcOrderPrices([{ price: -5, qty: 1 }]), /Invalid item price/);
});

test('5. canAccessOrder enforces order ownership and admin override (IDOR protection)', () => {
  const order = { user: { _id: 'u1' } };
  assert.equal(canAccessOrder(order, { _id: 'u1', isAdmin: false }), true);
  assert.equal(canAccessOrder(order, { _id: 'u2', isAdmin: false }), false);
  assert.equal(canAccessOrder(order, { _id: 'admin1', isAdmin: true }), true);
});

test('6. admin middleware returns 403 Forbidden for non-admin users', () => {
  const res = mockRes();
  admin({ user: { _id: 'u1', isAdmin: false } }, res, () => {});
  assert.equal(res.statusCode, 403);
});

test('7. validateCredentialsInput blocks NoSQL operator objects and malformed emails', () => {
  assert.equal(validateCredentialsInput({ $gt: '' }, '123456').valid, false);
  assert.equal(validateCredentialsInput('bad-email', '123456').valid, false);
  assert.equal(validateCredentialsInput('user@devgear.com', 'secret123').valid, true);
});

test('8. checkAuthRateLimit allows 10 requests/min and blocks the 11th request (429)', () => {
  resetAuthBuckets();
  for (let i = 0; i < 10; i++) {
    assert.equal(checkAuthRateLimit('198.51.100.9'), true);
  }
  assert.equal(checkAuthRateLimit('198.51.100.9'), false);
});

test('9. validateReviewInput enforces integer ratings between 1 and 5', () => {
  assert.equal(validateReviewInput({ rating: 6, comment: 'Too high' }).valid, false);
  assert.equal(validateReviewInput({ rating: 0, comment: 'Too low' }).valid, false);
  assert.equal(validateReviewInput({ rating: 5, comment: 'Solid build quality' }).valid, true);
});

test('10. errorHandler returns 403 on CORS rejection and 413 on oversized body', () => {
  const resCors = mockRes();
  errorHandler(new Error('Not allowed by CORS'), {}, resCors, () => {});
  assert.equal(resCors.statusCode, 403);

  const resLarge = mockRes();
  errorHandler({ type: 'entity.too.large' }, {}, resLarge, () => {});
  assert.equal(resLarge.statusCode, 413);
});
