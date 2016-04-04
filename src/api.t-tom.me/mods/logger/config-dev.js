const path = require('path');
module.exports = {
  "appenders": [

    //always print in console
    {
      "type": "console"
    },

    //http error
    {
      "type": "dateFile",
      "pattern": "-yyyy-MM-dd",
      "filename": path.join(__dirname, '../../log/error/httpError/http-error-log.log'),
      "category": ['httpError'],
      "alwaysIncludePattern": true,
      "level": "ERROR"
    },

    //server error
    {
      "type": "dateFile",
      "filename": path.join(__dirname, '../../log/error/serverError/server-error-log.log'),
      "pattern": "-yyyy-MM-dd",
      "category": ['serverError'],
      "alwaysIncludePattern": true,
      "level": "ERROR"
    },

    //http-info
    {
      "type": "dateFile",
      "filename": path.join(__dirname, '../../log/info/http-info/http-info-log.log'),
      "pattern": "-yyyy-MM-dd",
      "category": ['httpInfo'],
      "alwaysIncludePattern": true,
      "level": "info"
    },

    //server-info
    {
      "type": "dateFile",
      "filename": path.join(__dirname, '../../log/info/server-info/server-info-log.log'),
      "pattern": "-yyyy-MM-dd",
      "category": ['serverInfo'],
      "alwaysIncludePattern": true,
      "level": "info"
    },

    //error handle
    {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": {
        "type": "file",
        "filename": path.join(__dirname, '../../log/error.all.log')
      }
    }
  ],
  replaceConsole: true
};
