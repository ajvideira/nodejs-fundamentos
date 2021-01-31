const express = require('express');
const path = require('path');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('HELLO WORLD!!');
});

app.post('/carros', (req, res) => {
  const carro = req.body;
  console.log(carro);
});

app.listen(3000);