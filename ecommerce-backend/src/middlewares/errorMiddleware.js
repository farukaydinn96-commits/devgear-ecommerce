export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  if (err?.type === 'entity.too.large' || err?.status === 413) {
    return res.status(413).json({ message: 'Payload Too Large (max 16kb)' });
  }
  if (err?.message && err.message.toLowerCase().includes('cors')) {
    return res.status(403).json({ message: 'Forbidden: Origin not allowed by CORS' });
  }

  let statusCode = err?.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err?.message || 'Internal Server Error';

  if (err?.name === 'CastError' && err?.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  return res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err?.stack
  });
};
