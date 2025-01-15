const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config({ path: './.env' });

connectDB();

const transactions = require('./src/routes/transactions.js');

app.use(express.json());

app.use(cors({
  origin: true,
  methods: 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
  allowedHeaders: 'Origin, Content-Type, Accept, Authorization, X-Request-With, Content-Range, Content-Disposition, Content-Description',
  credentials: true 
}));

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

app.get('/', (req, res)=> {
  res.send('Home')
})

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

module.exports = app;