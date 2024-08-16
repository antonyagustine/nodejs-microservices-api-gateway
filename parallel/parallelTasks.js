const axios = require('axios');

async function fetchData(url) {
  const response = await axios.get(url);
  return response.data;
}

async function parallelTask() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
    'https://jsonplaceholder.typicode.com/comments',
  ]

  const promises = urls.map(url => fetchData(url));

  try {
    const results = await Promise.all(promises);

    // Process the results
    results.forEach((data, index) => {
      console.log(`Data from ${urls[index]}`, data);  
    });
  } catch (error) {
    console.error('Error fetching data', error.message);
  }
}

// Run the parallel task
parallelTask();