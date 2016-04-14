const express = require('express');
const router = express.Router();

const Json = require('../../../mods/jsonWrap');
const authController = require('../controller/auth');

router.post('/login', (req, res)=> {
  var user = req.body.user, pwd = req.body.pwd;
  authController.auth.authAdmin().then(result=> {
    if (result.data.name === user && result.data.pwd === pwd) {
      req.session.regenerate(function () {
        req.session.user = user;
        req.session.pwd = pwd;
        req.session.save();
        res.status(200).json(Json.success()).end();
      });
    } else {
      res.status(403).json(Json.error("未知用户权限")).end();
    }
  }).catch(ex=> {
    res.status(403).json(Json.error("查询用户权限错误")).end();
  });
});

module.exports = router;
