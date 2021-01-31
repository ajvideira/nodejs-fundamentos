const http = require('http');
const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Processo ${worker.process.pid} online`);
  });

  cluster.on('listening', (worker) => {
    console.log(`Processo ${worker.process.pid} escutando`);
  });

  cluster.on('exit', (worker) => {
    console.log(`Processo ${worker.process.pid} caiu`);
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`Você caiu no processo ${process.pid}`);
    })
    .listen(8000);
}
