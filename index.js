const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const cors = require('cors');
const transactions = require('./src/routes/transactions');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());

dotenv.config({ path: './.env' });

connectDB();

app.use('/api/v1/transactions', transactions);

app.get('/', (req, res)=> {
  res.send('Home')
})

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: true,
  methods: 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
  allowedHeaders: 'Origin, Content-Type, Accept, Authorization, X-Request-With, Content-Range, Content-Disposition, Content-Description',
  credentials: true 
}));


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

module.exports = app;