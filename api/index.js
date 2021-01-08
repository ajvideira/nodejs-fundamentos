const http = require('http');
const queryString = require('querystring');

const Service = require('./service');

const server = http.createServer((request, response) => { 
  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUST,DELETE');
    response.end();
  } else if (request.method === 'GET' && request.url === '/favoritos') {
    Service.listAll().then(result=>{
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUST,DELETE');
      response.statusCode = 200;
      response.end(JSON.stringify(result));
    });
  } else if (request.method === 'POST' && request.url === '/favoritos') {
    parseBodyJson(request)
    .then(json=>{
    return Service.add(json);
    })
    .then(() => {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUST,DELETE');
      response.statusCode = 200;
      response.end();
    });
  } else if (request.method === 'DELETE' && /\/favoritos\/([\d]+)/g.test(request.url)) {
    console.log('quer deletar');
    const id = request.url.substr(request.url.lastIndexOf("/")+1);
    Service.remove(id).then(() => {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUST,DELETE');
      response.statusCode = 200;
      response.end();
    });
  }
});

function parseBodyJson(request) {
  return new Promise((resolve, reject)=>{
    let body = '';
    request.on('data', data => {
      body += data;
    });
    request.on('end', ()=>{
      resolve(JSON.parse(body));
    });
  });
}

server.listen(3000);