'use strict';
const express = require('express');
const router = express.Router();

const user = {
  name: "admin",
  pwd: "admin"
};

router.get('/session', (req, res)=> {
  if (req.session.userId == 'admin') {
    res.render("session", {
      title: "welcome",
      type: 'loginAfter'
    })
  } else {
    res.render("session", {
        title: "login",
        type: "login"
      }
    );
  }

});
router.post('/session/login', (req, res)=> {
  var body = req.body;
  if (body.name === user.name && body.pwd === user.pwd) {
    req.session.regenerate(function () {
      req.user = user.name;
      req.session.userId = user.pwd;
      req.session.save();
      res.redirect("/demo/session")
    });
  } else {
    res.render("session", {
      title: "login",
      type: "login"
    })
  }

});
module.exports = router;

