const express = require('express');
const router = express.Router();

var Json = require('../../../mods/jsonWrap');


router.post('/login', (req, res)=> {
  var user = req.body.user, pwd = req.body.pwd;
  req.session.regenerate(function () {
    req.session.user = user;
    req.session.pwd = pwd;
    req.session.save();
    res.status(200).json(Json.success()).end();
  });
});

module.exports = router;
