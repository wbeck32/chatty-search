const express = require('express');
const app = express();
const morgan = require('morgan');
// const errorHandler = require('./error-handler')();

app.use(morgan('dev'));
app.use(express.static('public'));

const wit = require('./routes/wit');
const ebay = require('./routes/ebay');

app.use('/wit', wit);
app.use('/ebay', ebay);

// app.use(errorHandler);

module.exports = app;
