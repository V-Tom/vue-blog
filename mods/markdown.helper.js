var marked = require('marked'),
    heightLight = require('highlight.js');
(function (factory) {
    if (typeof exports === "object") {
        module.exports = factory();
    } else {
        throw new Error('must be in a Node.js environment')
    }
}(function () {
    "use strict";

    var App = {};

    App.highlightAuto = function (data) {

        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            langPrefix: 'language-',
            highlight: function (code) {
                return heightLight.highlightAuto(code).value;
            }
        });
        return marked(data.toString());
    };

    App.highlight = function (type, data) {
        if (!type) {
            return false;
        }
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            langPrefix: 'language-',
            highlight: function (code) {
                return heightLight.highlight(type.toString(), code, true).value;
            }
        });
        return marked(data.toString())
    };
    module.exports = App;
    return App;

}));