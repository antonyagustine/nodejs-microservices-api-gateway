const winston = require('winston');

// Create a Winston logger with console and file transports
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

logger.middleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    body: req.body,
    query: req.query
  });
  next();
}

module.exports = logger;
