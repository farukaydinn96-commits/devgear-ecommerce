const authBuckets = new Map();

export const checkAuthRateLimit = (ip = 'anon') => {
  const now = Date.now();
  const recent = (authBuckets.get(ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 10) {
    return false;
  }
  recent.push(now);
  authBuckets.set(ip, recent);
  return true;
};

export const resetAuthBuckets = () => authBuckets.clear();

export const validateCredentialsInput = (email, password) => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { valid: false, message: 'Email and password must be strings' };
  }
  const trimmedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { valid: false, message: 'Invalid email format' };
  }
  if (password.length < 6 || password.length > 128) {
    return { valid: false, message: 'Password must be between 6 and 128 characters' };
  }
  return { valid: true, email: trimmedEmail };
};

export const validateReviewInput = ({ rating, comment }) => {
  const numRating = Number(rating);
  if (!Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
    return { valid: false, message: 'Rating must be an integer between 1 and 5' };
  }
  if (typeof comment !== 'string' || comment.trim().length < 2 || comment.trim().length > 1000) {
    return { valid: false, message: 'Review comment must be between 2 and 1000 characters' };
  }
  return { valid: true, rating: numRating, comment: comment.trim() };
};
