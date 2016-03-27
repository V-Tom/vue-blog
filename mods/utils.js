(function (factory) {
    if (typeof exports === "object") {
        module.exports = factory();
    } else {
        throw new Error('must be in a Node.js environment')
    }
}(function () {
    "use strict";

    var App = {};

    App.extend = function (target, options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                target[key] = options[key];
            }
        }
        return target;
    };
    App.extendDeep = function (target, options) {

    };


    App.isObject = function (el) {
        return Object.prototype.toString.call(el) === "[object Object]"
    };

    module.exports = App;
    return App;

}));