"use strict";
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const ConfigSession = require('../config').session;


const devVersion = require('../config').devVersion;

app.set('env', 'development');
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.set('x-powered-by', false);
app.set('etag', true);

//favicon
app.use(favicon(path.join(__dirname, '../src', 'favicon.ico')));
//gzip
app.use(compression({level: 9}));
//logger
app.use(logger('dev'));
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//cookie
app.use(cookieParser());
//static
app.use('/static/dist', express.static(path.join(__dirname, '../dist')));
//session
app.use(session(ConfigSession(MongoStore)));


//custom router
var index = require('../routes/index');
var authApi = require('../routes/auth');
var blogApi = require('../routes/blog');

app.use('/', index);
app.use('/dev/' + devVersion + '/blog', blogApi);
app.use('/dev/' + devVersion + '/auth', authApi);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.status != 404) {
      console.error(err.message);
      console.error(err.stack);
    }
    res.render('error', {
      title: "Error-dev",
      message: err.message,
      error: err
    });
    next();
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: '啊哦,发生错误了~' + err.status || 500,
    message: err.message,
    error: {}
  });
  next();
});


module.exports = app;

