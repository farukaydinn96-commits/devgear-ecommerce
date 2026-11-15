# DevGear — Full-Stack Developer Hardware E-Commerce Platform

- **Live Storefront (Vercel):** [https://devgear-ecommerce-one.vercel.app](https://devgear-ecommerce-one.vercel.app)
- **REST API (Render):** [https://devgear-api.onrender.com/api/health](https://devgear-api.onrender.com/api/health)

DevGear is a production-deployed MERN + Redis e-commerce platform built for software engineers. It features real JWT authentication, a 1-Click Recruiter Demo Sandbox, category/sort/pagination filtering, stock-validated checkout, itemized tax/shipping calculation, and Stripe Test Mode payment processing.

---

## Architecture Decision Records (ADR) — How Redis & JWT Are Used

### 1. Why & How Redis Is Used (ecommerce-backend/src/controllers/productController.js)
- **Use Case:** Read-through catalog caching with automatic write invalidation.
- **Flow:**
  1. When GET /api/products is called, the controller checks Redis (redisClient.get('products:all:v3')).
  2. **Cache Hit:** Returns the serialized hardware catalog directly from Redis memory in under 5ms without hitting MongoDB Atlas.
  3. **Cache Miss:** Queries MongoDB (Product.find({})), stores the result in Redis with a 1-hour TTL (setEx('products:all:v3', 3600, ...)), and returns the response.
  4. **Cache Invalidation:** Whenever a user submits a review (POST /api/products/:id/reviews) or places an order (POST /api/orders) that decrements countInStock, the backend immediately invalidates the cache (redisClient.del('products:all:v3')) to guarantee strong stock consistency.
  5. **Graceful Degradation:** If the Redis instance is unreachable, config/redis.js falls back to a non-blocking no-op client so the API never crashes.

### 2. How JWT Authentication & Session Management Work (authMiddleware.js & generateToken.js)
- **Password Security:** User passwords are hashed using bcryptjs (10 salt rounds) via a Mongoose pre('save') hook in userModel.js.
- **Dual Transport (Cookie + Bearer Header):** Because the React SPA is hosted on vercel.app and the Express API is hosted on onrender.com (cross-origin), modern browsers often block third-party cookies under strict ITP rules. To solve this:
  - generateToken.js issues an httpOnly, Secure, SameSite=None cookie and returns the signed JWT (HS256, 30d expiration) in the login payload.
  - An Axios request interceptor (main.jsx) attaches Authorization: Bearer token to outgoing API requests, and protect middleware validates either transport seamlessly.

### 3. Isolated Recruiter Demo Sandbox (/admin)
- Recruiters can launch the **1-Click Recruiter Demo** without filling out forms.
- To prevent visitors from permanently deleting catalog items or corrupting shared database state for other reviewers, sandbox mutations are isolated to the client session and include a **1-Click Reset Demo Data** button.

---

## Running Automated Tests

    node --test ecommerce-backend/tests/ecommerce.test.js
