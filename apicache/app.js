const express = require('express');
const apiCache = require('apicache');

const app = express();
let cache = apiCache.middleware;
const port = 3000;

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
  next();
});

app.get('/profile', cache('2 minutes'), (req, res) => {
  res.json({ message: 'User profile Data' });
});

app.get('/list', cache('1 day'), (req, res) => {
  res.json({ message: 'Product list data' });
});

// NOTE caches all routes (note when specified, it overrides the default)
app.use(cache('1 minute'));

app.get('/history', (req, res) => {
  res.json({ message: 'History data' });
})

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});