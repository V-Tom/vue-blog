const express = require('express');
const router = express.Router();
var Config = require('../config');


/* HOME PAGE */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: Config.app.routerTitle.index,
    login: req.session && req.session.userId
  });
});

router.get('/404', (req, res)=> {
  res.render('404', {
    title: Config.app.routerTitle.notFound
  });
});

router.get('/error', (req, res)=> {
  res.render('error', {
    title: Config.app.routerTitle.error
  });
});

module.exports = router;
