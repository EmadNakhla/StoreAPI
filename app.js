const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const connectionString = process.env.CONNECTION_STRING
  || 'mongodb+srv://lol:gbX5suBeHQzRbBo1@companyproducts.qqaiod7.mongodb.net/Store?retryWrites=true&w=majority';
const app = express();
const db = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 3000;
const Product = require('./models/productModel');
const Category = require('./models/categoryModel');
const productRouter = require('./routers/productRouter')(Product);
const categoryRouter = require('./routers/categoryRouter')(Category);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});
app.use('/api', productRouter);
app.use('/api', categoryRouter);

app.listen(port, () => {
  console.log(`App started at port ${chalk.green(port)}`);
});
