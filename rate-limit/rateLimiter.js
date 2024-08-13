const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 request per second
  message: 'You have exceeded the 5 requests in 1 minute limit!',
  headers: true,
});

module.exports = rateLimitMiddleware;