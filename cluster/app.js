const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Clustering to ${cpus} CPUs`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Worker process code

  // Prime Number calculator
  function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
  }

  function calculatePrimesInRange(start, end) {
    let primes = [];

    for (let i = start; i <= end; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }

    return primes;
  }

  const startRange = 5555555;
  const endRange = 5555655;

  console.time(`Worker ${process.pid} - Execution Time`);
  const result = calculatePrimesInRange(startRange, endRange);
  console.timeEnd(`Worker ${process.pid} - Execution Time`);

  console.log(`Worker ${process.pid} - Prime numbers between ${startRange} and ${endRange}:`, result);

  // Simulate a new task by sleeping for a short period
  setTimeout(() => {
    process.exit(0);
  }, 5000);
}