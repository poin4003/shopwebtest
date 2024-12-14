const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const Product = mongoose.model('Product', {
  name: String,
  price: Number,
});

app.get('/', (req, res) => {
  res.send('Hello, World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
});

app.get('/products', (req, res) => {
  Product.find()
    .then(products => res.json({
      status: 'success',
      data: products
    }))
    .catch(error => res.status(500).json({ error }));
});

app.post('/products', (req, res) => {
  const product = new Product(req.body);
  product.save()
    .then(product => res.json({
      status: 'success',
      data: product
    }))
    .catch(error => res.status(500).json({ error }));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});