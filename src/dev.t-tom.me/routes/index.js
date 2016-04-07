const express = require('express');
const router = express.Router();
var Config = require('../config');

var Json = require('../../../mods/jsonWrap');

/* HOME PAGE */
router.get('/', function (req, res, next) {
  var session = req.session;
  if (session.user === "s" && session.pwd === "s") {
    res.render('index', {
      title: Config.app.routerTitle.index,
      needAuth: false
    })
  } else {
    res.render('index', {
      title: Config.app.routerTitle.index,
      needAuth: true
    })
  }
});
/*404 PAGE*/
router.get('/404', (req, res)=> {
  res.render('404', {
    title: Config.app.routerTitle.notFound
  });
});

/*ERROR PAGE*/
router.get('/error', (req, res)=> {
  res.render('error', {
    title: Config.app.routerTitle.error
  });
});

module.exports = router;
