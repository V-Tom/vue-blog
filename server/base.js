/**
 * Module dependencies.
 */

const app = require('../src/t-tom.me');
const debug = require('debug')('express-blog:server');
const http = require('http');

const port = require('../src/t-tom.me/config').app.port;

const server = http.createServer(app);
const serverLog = require('../mods/logger').server;

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
process.on('uncaughtException', function (err) {
  serverLog.serverError.error(err.name);
  serverLog.serverError.error(err.message);
  serverLog.serverError.error(err.stack);
  serverLog.serverError.error('\n');
});
/**
 * Event listener
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('server is listen on port : ' + port);
}
