const jwt = require('jsonwebtoken');
var Config = require('../../config');
let App = {};

App.decode = function (data, salt) {
  return jwt.verify(data, salt ? salt : Config.app.siteDomain)
};

App.decodeWithType = function (data, salt, type) {
  return jwt.verify(data, salt ? salt : Config.app.siteDomain, {algorithm: type})
};

App.decodeByKey = function (data, keyURL, type) {
  var cert = fs.readFileSync(keyURL);
  if (type) {
    return jwt.verify(data, cert, {algorithm: type})
  } else {
    return jwt.verify(data, cert);
  }
};

module.exports = App;
