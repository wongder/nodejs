// Clustering
console.log(`Starting now on ${process.pid}`);

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Clustering, Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs/2; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Clustering, worker ${worker.process.pid} died`);
  });

  let pile = {
    elements: ['eggshell', 'orange', 'corn'],
    get height() { return this.elements.length; },
    set height(value) { console.log(`Ignore attempt setting height to ${value}`); }
  };
  console.log(`Getter setter ${pile.height}`);
  pile.height = 100;
} else {
  // Workers can share any TCP connection ... in this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    // res.end('hello world\n');
    res.end(`hello world on ${process.pid}\n`);
  }).listen(8000);

  console.log(`Clustering, Worker ${process.pid} started`);
}

