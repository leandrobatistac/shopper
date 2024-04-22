require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./route/productRoute');
const packsRouter = require('./route/packsRoute');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Rota raiz
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.use('/products', productsRouter);
app.use('/packs', packsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
