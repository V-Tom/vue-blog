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

const apiVersion = 'v1';

const app = express();
const ConfigSession = require('../config').session;

app.set('env', 'development');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('x-powered-by', false);
app.set('etag', true);

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.status(200)
  }
  next();
};

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
app.use(express.static(path.join(__dirname, '/views')));
//session
app.use(session(ConfigSession(MongoStore)));
//# Add common headers to all requests
app.all('*', allowCrossDomain);


//custom router
const demoApi = require('../routes/demo');
const blogApi = require('../routes/blog');
const toolsApi = require('../routes/tools');
const authApi = require('../routes/auth');

app.use('/demo', demoApi);
app.use('/api/' + apiVersion + '/blog', blogApi);
app.use('/api/' + apiVersion + '/tools', toolsApi);
app.use('/api/' + apiVersion + '/auth', authApi);

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
      res.render('error', {
        title: "Error-dev",
        message: err.message,
        error: err
      });
    }
    next();
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: '啊哦,发生错误了~',
    message: err.message,
    error: {}
  });
  next();
});


module.exports = app;

