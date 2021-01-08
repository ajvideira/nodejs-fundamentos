const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url;
  const filePath = path.join(__dirname,'public', file);

  fs.readFile(filePath).then((content)=>{
    res.writeHead(200);
    res.end(content);
  }).catch(err => {
    res.writeHead(404);
    res.end();
  });

});

server.listen(3333, 'localhost', () => {
  console.log('tá rodando.'); 
});