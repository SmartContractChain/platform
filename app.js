var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Promise = require('bluebird');

var userRouter = require('./User/index');
var makerRouter = require('./Maker/index');
var backerRouter = require('./Backer/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/maker', makerRouter);
app.use('/backer', backerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var Mongoose = Promise.promisifyAll(require("mongoose"));

Mongoose.connect('mongodb://localhost:27017/maker-ico-test4')
    .then(function(response) {
        console.log("MONGO DB STATUS " + response)
    })
    .catch(function(err) {
        console.log("error " + JSON.stringify(err))
    });


module.exports = app;
