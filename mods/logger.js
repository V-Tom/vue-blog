const FS = require('fs');
(()=> {
    "use strict";

    const PATH = "./mods/logger.txt";


    var App = {};


    App.init = ()=> {


    };

    App.log = (data)=> {
        //MAX 2048
        FS.appendFile(PATH, data + ',\n', {
            encoding: "utf-8",
            flag: "a+"
        }, (err)=> {
            if (err) {
                console.log(err);
            }
        })

    };

/*
    App.log(JSON.stringify({
        "data": "hello Node.js",
        "date": new Date().getTime()
    }));
*/
    module.exports = App;

})();