const express = require("express");
const logger = require("./logger");

const app = express();
const port = 3000;

app.use(logger.middleware);

app.get("/", (req, res) => {
  logger.info("Hello, from the root endpoint");
  res.send("Hello, from the root endpoint");
});

app.get("/users", (req, res) => {
  logger.info("Hello, from the users endpoint");
  res.send("Hello, from the users endpoint");
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
