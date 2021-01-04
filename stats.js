const os = require('os');
const log = require('./logger');

setInterval(() => {
  const {freemem, totalmem} = os;

  const free = freemem();
  const total = totalmem();
  const percent = `${parseInt(freemem()/totalmem()*100)}%`;
  
  const formatter = valueMem => {
    return `${parseInt(valueMem/1024/1024)}MB`;
  };
  
  const mem = {
    free: formatter(free),
    total: formatter(total),
    percent: percent
  };
  
  console.clear();
  console.table(mem);
  log(JSON.stringify(mem));
}, 1000);

