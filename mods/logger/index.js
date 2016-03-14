const log4js = require('log4js');
const path = require('path');

var configDev = require('./config-dev');

log4js.configure(configDev);

//module.exports = {
//  httpError: log4js.getLogger('httpError'),
//  serverError: log4js.getLogger('serverError'),
//  httpInfo: log4js.getLogger('httpInfo'),
//  serverInfo: log4js.getLogger('serverInfo')
//};
