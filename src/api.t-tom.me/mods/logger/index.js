const log4js = require('log4js');

var configDev = require('./config-dev');

log4js.configure(configDev);

module.exports = {
  server: {
    serverError: log4js.getLogger('serverError'),
    serverInfo: log4js.getLogger('serverInfo')
  },
  http: {
    httpError: log4js.getLogger('httpError'),
    httpInfo: log4js.getLogger('httpInfo')
  }
};
