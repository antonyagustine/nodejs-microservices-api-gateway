const express = require('express');
const rateLimit = require('express-rate-limit');
const { RateLimiterMemory, RateLimiterRes } = require('rate-limiter-flexible');
const rateLimitMiddleware = require('./rateLimiter');

const app = express();
const port = 3000;

const rateLimiter = new RateLimiterMemory({
  points: 5, // 10 points
  duration: 4, // 4 seconds
});

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10 // 10 request per second
});

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
  next();
});

// Apply token bucket to all routes
app.use(rateLimitMiddleware);

app.use('/limited', limiter);

app.get('/limited/service', (req, res) => {
  res.json({ message: 'This is a limited microservice using sliding window' });
});

app.get('/bucket', (req, res, next) => {
  rateLimiter
    .consume(req.ip, 1)
    .then(() => {
      res.json({
        message: "This is a limited microservice using token bucket",
      });
    })
    .catch((rateLimiterRes) => {
      if (rateLimiterRes instanceof RateLimiterRes) {
        console.log(rateLimiterRes);
        res.status(429).send("Token bucket is empty, Too Many Requests sent");
      }
    });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});