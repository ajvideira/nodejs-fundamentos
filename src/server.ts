import express from 'express';

import '@controllers/UserController';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
