const express = require('express');
const router = express.Router();
const Config = require('../config');

const auth = require('../controller').auth;

/* HOME PAGE */
router.get('/', function (req, res, next) {
  var session = req.session, renderAuthFailed = ()=> {
    res.render('index', {
      title: Config.app.routerTitle.index,
      needAuth: true
    })
  };
  auth.authAdmin().then(result=> {
    if (result.success) {
      if (session.user === result.data.name && session.pwd === result.data.pwd) {
        res.render('index', {
          title: Config.app.routerTitle.index,
          needAuth: false
        })
      } else {
        renderAuthFailed();
      }
    } else {
      renderAuthFailed();
    }
  }).catch(ex=> {
    renderAuthFailed();
  });
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
