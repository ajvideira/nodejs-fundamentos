import express from 'express';

import UserController from '@controllers/UserController';

const app = express();

UserController.teste();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
