const express = require('express');
require('dotenv').config({ path: './config/config.env' });
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const pinoLogger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

app.use(pinoLogger);

const products = require('./routes/products');
app.use('/api/products', products);

const reviews=require('./routes/reviews')

app.use('/api',reviews)

const users=require('./routes/users')

app.use('/api/auth',users)


const cart=require('./routes/cart')

app.use('/api/cart',cart)
// ✅ FIXED STATIC FILE PATH

app.use('/products', express.static(path.join(__dirname, 'public/products')));

const orders=require('./routes/orders')

app.use('/api/orders',orders)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});