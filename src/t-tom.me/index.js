"use strict";
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('./config');

const apiVersion = config.apiVersion;
const app = express();

app.set('env', config.app.env);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.set('x-powered-by', false);
app.set('etag', true);

//favicon
app.use(favicon(path.join(__dirname, './static', 'favicon.ico')));
//gzip
app.use(compression({level: 9}));
//logger
app.use(logger('dev'));
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static
app.use('/static/dist', express.static(path.join(__dirname, './dist'), {
  maxAge: config.app.maxAge
}));

//api cors
app.use('/api', (req, res, next)=> {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.status(200)
  }
  next();
});

//custom router
var index = require('./routes/index');
const demoApi = require('./routes/api/demo');
const blogApi = require('./routes/api/blog');
const toolsApi = require('./routes/api/tools');
app.use('/', index);

app.use('/demo', demoApi);
app.use('/api/' + apiVersion + '/blog', blogApi);
app.use('/api/' + apiVersion + '/tools', toolsApi);
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
    title: 'Error',
    message: err.message,
    error: {}
  });
  next();
});


module.exports = app;

