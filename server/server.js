const express = require('express');
const cors = require('cors');
const path = require('path');

// Load environment configurations
require('dotenv').config({ path: './config/config.env' });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const pinoLogger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

app.use(pinoLogger);

// Static Asset Routing (For serving product images)
app.use('/public/products', express.static(path.join(__dirname, 'public/products')));

// Base Root Route (Prevents ugly "Cannot GET /" errors)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Fullstack E-Commerce API! Everything is live and healthy."
  });
});

// App Feature Routes
const products = require('./routes/products');
app.use('/api/products', products);

const reviews = require('./routes/reviews');
app.use('/api/reviews', reviews); 

const users = require('./routes/users');
app.use('/api/auth', users);

const cart = require('./routes/cart');
app.use('/api/cart', cart);

const orders = require('./routes/orders');
app.use('/api/orders', orders);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is successfully running on port ${PORT}`);
});