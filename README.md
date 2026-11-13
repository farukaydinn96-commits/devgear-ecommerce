# DevGear — Full-Stack Developer Hardware E-Commerce Platform

- **Live Storefront (Vercel):** https://devgear-ecommerce-one.vercel.app
- **REST API (Render):** https://devgear-api.onrender.com/api/health

DevGear is a production-deployed MERN + Redis e-commerce platform tailored for software engineers. It features real JWT authentication, 1-click recruiter demo roles, category/sort/pagination filtering, stock-validated checkout, Stripe Test Mode payment processing, and an interactive Admin Inventory Command Center.

## Architecture Decision Records (ADR)

1. **Hybrid Optimistic Catalog + Redis Cache:** Solves free-tier cold starts by serving verified catalog state in 0ms on the client while caching MongoDB queries in Redis (`products:all:v2`) with automatic cache invalidation on stock or review updates.
2. **Dual JWT Authentication (Bearer Header + HTTP-Only Cookie):** Supports cross-domain deployments (`vercel.app` to `onrender.com`) reliably by validating both `Authorization: Bearer <token>` and `httpOnly` cookies.
3. **Centralized Error Middleware & Stock Consistency:** `errorMiddleware.js` handles invalid MongoDB `ObjectId` casts and runtime errors cleanly, while order creation decrements `countInStock` and invalidates stale cache entries.

## Running Automated Tests

    node --test ecommerce-backend/tests/ecommerce.test.js
