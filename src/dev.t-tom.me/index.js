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
const ConfigSession = require('./config').session;

const config = require('./config');

const devVersion = config.devVersion;

app.set('env', config.app.env);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.set('x-powered-by', false);
app.set('etag', true);

if (app.get('env') === 'development') {
  const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.status(200)
    }
    next();
  };
  //cros
  app.use(allowCrossDomain);
}

//favicon
app.use(favicon(path.join(__dirname, './static', 'favicon.ico')));
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
app.use('/static/dist', express.static(path.join(__dirname, './dist'), {
  maxAge: config.app.maxAge
}));
//session
app.use(session(ConfigSession(MongoStore)));


//custom router
var index = require('./routes/index');
var authApi = require('./routes/auth');
var blogApi = require('./routes/blog');

app.use('/', index);
app.use('/dev/' + devVersion + '/blog', blogApi);
app.use('/dev/' + devVersion + '/auth', authApi);


// catch 404 and forward to error handler
app.use((req, res, next)=> {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use((err, req, res, next)=> {
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

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    title: '啊哦,发生错误了~' + err.status || 500,
    message: err.message,
    error: {}
  });
  next();
});


module.exports = app;

