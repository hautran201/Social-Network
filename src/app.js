const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const ErrorHander = require('./middlewares/error-handle');
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// init database
require('./database/init.mongodb');

//init routes
app.use('', require('./routes'));

//init handler error
app.use(ErrorHander);

module.exports = app;
