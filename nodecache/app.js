const express = require('express');
const NodeCache = require('node-cache');

const app = express();
let cache = new NodeCache();
const port = 3000;

app.get('/data', (req, res) => {
  const cacheData = cache.get('data');

  if (cacheData) {
    res.json({ message: 'Data from cache', data: cacheData });
  } else {
    const data = { message: 'Data from server' };
    cache.set('data', data, 60);
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});