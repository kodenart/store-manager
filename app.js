const express = require('express');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/sales', salesRoute);
app.use('/products', productsRoute);

app.use(errorHandler);

module.exports = app;
