(()=> {

  const Utils = require('./utils');
  const App = {};
  App.success = function () {
    if (arguments.length === 1) {
      return App._successWrap(arguments[0]);
    } else if (arguments.length > 1) {
      var result = App._successWrap(arguments[0]);
      for (var i = 1; i < arguments.length; i++) {
        result = Utils.extend(result, arguments[i])
      }
      return result;
    } else {
      return App._successWrap();
    }
  };

  App.error = function () {
    if (arguments.length === 1) {
      return App._errorWrap(arguments[0]);
    } else if (arguments.length > 1) {
      var result = App._errorWrap(arguments[0]);
      for (var i = 1; i < arguments.length; i++) {
        result = Utils.extend(result, arguments[i])
      }
      return result;
    } else {
      return App._errorWrap();
    }
  };
  App._successWrap = (data)=> {
    return {
      "success": true,
      "timeShown": new Date().getTime(),
      "data": data || null
    }
  };
  App._errorWrap = (err)=> {
    return {
      "success": false,
      "timeShown": new Date().getTime(),
      "data": null,
      "err": err || null
    }
  };
  module.exports = {
    success: App.success,
    error: App.error
  }
})();
