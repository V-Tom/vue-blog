'use strict';
const express = require('express');
const router = express.Router();
const path = require("path");

var config = require('../../config');
var authController = require('../../controller/auth');
var jwt = require(path.join(config.path.modsPath, "jwt"));

router.get('/login', (req, res)=> {
  let query = req.query, code = query && query.code, type = query && query.state;
  if (type === "GitHub") {
    authController.auth.GitHubAccess(code).then(userInfo=> {
      let expires = new Date(Date.now() + config.db.sessionMaxAge);
      let userName = userInfo.name, userAvatar = userInfo.avatar_url, userId = userInfo.id;
      userId = jwt.encode.encode(userId);
      res.cookie('userName', userName, {
        expires: expires,
        httpOnly: true
      });
      res.cookie('avatarUrl', userAvatar, {
        expires: expires,
        httpOnly: true
      });
      res.cookie('userId', userId, {
        expires: expires,
        httpOnly: true
      });
      req.session.regenerate(function () {
        req.session.login = true;
        req.session.cookie.expires = expires;
        req.session.cookie.maxAge = config.db.sessionMaxAge;
        req.session.userName = userName;
        req.session.userAvatarUrl = userAvatar;
        req.session.userId = userId;
        req.session.save();
        res.status(200).end(`<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to Nomand\' Blog</title>
    <script>
      window.localStorage.setItem("NomandWebsiteLogin", true);
      window.localStorage.setItem("userName", "${userInfo.name}");
      window.localStorage.setItem("userAvatarUrl","${userInfo.avatar_url}");
          setTimeout(function () {
              window.opener.location.reload();
              window.close();
          }, 2000)
    </script>
  </head>
  <body>
    <h1>Welcome to Nomand\' Blog</h1>
  </body>
</html>`);
      });
    }).catch(ex=> {
      res.status(500).end()
    });
  }

});

module.exports = router;
