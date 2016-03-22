const exec = require('child_process').exec;

var App = {};

App.exec = function (command, cb) {
  if (arguments.length !== 2) {
    return false;
  } else {
    try {
      exec(command, function (err, stdout, stderr) {
        cb.call(null, err, stdout, stderr);
      })
    } catch (ex) {
      cb.call(null, ex);
    }
  }
};

module.exports = App;
