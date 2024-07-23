const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

require('dotenv').config();
const mongoString = process.env.DATABASE_URL

const usersRouter = require('./routes/users');
const detailsRouter = require('./routes/details');
const suppliersRouter = require('./routes/suppliers');
const suppliesRouter = require('./routes/supplies');
const authRoutes = require('./routes/auth');

mongoose.connect(mongoString, {
  dbName: 'Sales',
});
const database = mongoose.connection;

const app = express();

const PORT = 3000;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', usersRouter);
app.use('/details', detailsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/supplies', suppliesRouter);
app.use('/auth', authRoutes);

app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type'], // Allow only headers with Content-Type
}));



app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next(err);
  }
});


app.listen((3000), () => console.log(`Server is listening on port ${PORT}`))

module.exports = app;
