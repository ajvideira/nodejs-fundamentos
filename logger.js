const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('log', message => {
  fs.appendFile(path.join(__dirname, 'log.txt'), `${message}\r\n`, err => {});
});

function log(message) {
  emitter.emit('log', message);
}

module.exports = log;