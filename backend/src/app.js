require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./route/productRoute');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota raiz
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.use('/products', productsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
