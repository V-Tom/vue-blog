"use strict";
class App {
    constructor(dbSource, fields) {
        this._isValid(dbSource);
        this._fields = null;
        if (fields) {
            this._setFields(fields);
        }
        this._extend();
    }

    _isValid(dbSource) {
        if (dbSource.DBName && dbSource.DBCollection) {
            this._DBName = dbSource.DBName;
            this._DBCollection = dbSource.DBCollection;
        } else {
            console.error('dbSource object isn\'t valid at db.core.js line 17  ')
        }
    }

    _setFields(array) {
        var obj = {};

        array.forEach(function (item) {
            obj[item] = null;
        });
        this._fields = obj;
    };

    _dealFields(data) {
        if (this._fields) {
            var key, fields = this._fields;
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    fields[key] = data[key]
                }
            }
            return fields;
        }
        return data;
    };

    _extend() {
        if (!Promise.always) {
            Promise.prototype.always = function (callback) {
                var P = this.constructor;
                return this.then(
                    (result) => {
                        return P.resolve(callback()).then(()=> {
                            return result;
                        })
                    }, (err)=> {
                        return P.resolve(callback()).then(()=> {
                            throw err;
                        })
                    });
            };
        }
    }
}

module.exports = App;

