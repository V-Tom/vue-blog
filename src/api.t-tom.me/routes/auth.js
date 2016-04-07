'use strict';
const express = require('express');
const router = express.Router();

const DBHelperFind = require('../../../mods/db/db.find'),
  DBHelperInsert = require('../../../mods/db/db.insert');

const authController = require('../controller/auth');
const Json = require('../../../mods/jsonWrap');

router.post('/login', (req, res)=> {
  var user = req.body.user, pwd = req.body.pwd;
  //authController.auth.authAdmin().then(result=> {
  //  if (result.success) {
  //    if (result.data.pwd === pwd && result.data.user === user) {
  req.session.regenerate(function () {
    req.session.user = user;
    req.session.pwd = pwd;
    req.session.save();
    res.status(200).json(Json.success()).end();
  });
  //} else {
  //  res.status(403).end();
  //}
  //} else {
  //  res.status(500).end();
  //}
  //}).catch(err=> {
  //  res.status(500).end();
  //})
});

router.get('/logout', (req, res)=> {
  req.session.destory();
  res.status(200).json(Json.success()).end();
});


module.exports = router;
