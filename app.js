const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const mongoString = process.env.DATABASE_URL

const usersRouter = require('./routes/users');
const detailsRouter = require('./routes/details');
const suppliersRouter = require('./routes/suppliers');
const suppliesRouter = require('./routes/supplies');
const authRoutes = require('./routes/auth');

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.use('/users', usersRouter);
app.use('/details', detailsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/supplies', suppliesRouter);
app.use('/auth', authRoutes);


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next(err);
  }
});


app.listen((3000), () => console.log(`Server is listening on port ${PORT}`))

module.exports = app;
