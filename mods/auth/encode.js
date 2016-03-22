'use strict';
const jwt = require('jsonwebtoken');
var Config = require('../../config');
let App = {};

App.encode = function (data, salt) {
  return jwt.sign(data, salt ? salt : Config.app.siteDomain)
};

App.encodeWithType = function (data, salt, type) {
  return jwt.sign(data, salt ? salt : Config.app.siteDomain, {algorithm: type})
};

App.encodeByKey = function (data, keyURL, type) {
  var cert = fs.readFileSync(keyURL);
  if (type) {
    return jwt.sign(data, cert, {algorithm: type})
  } else {
    return jwt.sign(data, cert);
  }
};

module.exports = App;
