"use strict";
class App {
  constructor(dbSource, auth, fields) {
    this._isValid(dbSource, auth);
    this._fields = null;
    if (fields) {
      this._setFields(fields);
    }
    this._extend();
  }

  _isValid(dbSource) {
    if (dbSource.source.DBName && dbSource.source.DBCollection) {
      this._DBName = dbSource.source.DBName;
      this._DBCollection = dbSource.source.DBCollection;
    } else {
      throw new SyntaxError('dbSource object isn\'t valid at db.core.js line 17  ')
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
  };

  auth(db) {
    //TODO 暂时去掉了,没有用到
    console.warn('db auth is not used');
    return new Promise().resolve(db);
    return new Promise((resolve, reject)=> {
      db.authenticate(this._DBUser, this._DBUserPwd, (err, result)=> {
        if (err) {
          reject(err);
        } else {
          if (result) {
            resolve();
          } else {
            reject(result);
          }
        }
      });
    })
  }
}

module.exports = App;

