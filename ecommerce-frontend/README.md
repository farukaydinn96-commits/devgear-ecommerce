# DevGear — Full-Stack Developer Hardware E-Commerce Store

- **Live Storefront (Vercel):** https://devgear-ecommerce-one.vercel.app
- **Backend REST API (Render):** https://devgear-api.onrender.com/api/health
- **Repository:** https://github.com/farukaydinn96-commits/devgear-ecommerce

DevGear is a full-stack MERN + Redis e-commerce application designed for developer hardware. It combines a server-validated Express/MongoDB order pipeline with a frictionless **Client-Side Recruiter Demo Sandbox** so reviewers can evaluate the storefront, cart, simulated Stripe checkout, and inventory sandbox even when the free-tier backend container is cold-starting.

---

## Architecture & What Is Server-Side vs. Client-Side Demo Sandbox

### 1. Server-Side Security & Order Integrity (`ecommerce-backend`)
- **Server-Side Price & Tax Calculation (`src/utils/calcPrices.js`):** `POST /api/orders` never trusts client-submitted totals. The server queries MongoDB for each product's canonical price and calculates `itemsPrice`, `shippingPrice` (free above $100, otherwise $10), and 15% `taxPrice`.
- **Atomic Stock Validation & Rollback (`src/controllers/orderController.js`):** Stock deduction uses an atomic MongoDB filter (`Product.findOneAndUpdate({ _id, countInStock: { $gte: qty } }, { $inc: { countInStock: -qty } })`). If any item in the cart has insufficient stock, previously decremented items are rolled back and the API returns `400 Bad Request`.
- **Order Ownership & IDOR Prevention:** `GET /api/orders/:id` and `PUT /api/orders/:id/pay` verify `canAccessOrder(order, req.user)` so users can only view or pay for their own orders (returning `403 Forbidden` otherwise). `PUT /api/orders/:id/deliver` requires both `protect` and `admin` middleware.
- **CORS Allowlist & JWT Secret Guard:** `server.js` restricts CORS origins to an explicit allowlist and fails fast on production startup if `JWT_SECRET` is missing.
- **Redis Read-Through Cache (`src/controllers/productController.js`):** `GET /api/products` caches the product catalog in Redis (`3600s` TTL) and invalidates the cache key (`DEL`) when orders or reviews are submitted. If Redis is unavailable, `src/config/redis.js` degrades gracefully to a no-op client.

### 2. Client-Side Recruiter Demo Sandbox & Simulated Stripe Checkout (`ecommerce-frontend`)
- **Simulated Stripe Test Checkout:** The checkout screen provides a simulated Stripe test card flow (`4242 •••• 4242`) that calls `PUT /api/orders/:id/pay` without requiring live Stripe SDK secret keys or real credit cards.
- **Client-Side Admin & Offline Fallback Sandbox:** To allow recruiters to test the UI immediately without credentials or while Render wakes up, the **1-Click Recruiter Demo** and **Admin Inventory Sandbox (`/admin`)** operate in a session-isolated `localStorage` sandbox with a **Reset Demo Data** button.
- **Sample Catalog & Reviews:** The storefront merges live stock levels with curated sample hardware descriptions and sample reviews (`initialProducts.js`) so product pages are consistently populated for UI evaluation.

---

## Local Setup & Seeding

```bash
git clone https://github.com/farukaydinn96-commits/devgear-ecommerce.git
cd devgear-ecommerce

# 1. Backend Setup
cp ecommerce-backend/.env.example ecommerce-backend/.env
cd ecommerce-backend
npm install
npm run dev

# Optional: Manual database seeding (never run automatically on server boot)
npm run data:import

# 2. Frontend Setup
cd ../ecommerce-frontend
npm install
npm run dev
```

---

## Automated Unit Tests

Run the backend test suite (`node:test`), which imports and tests `calcOrderPrices`, `canAccessOrder` (IDOR prevention), and the `admin` RBAC middleware directly:

```bash
npm --prefix ecommerce-backend test
```
