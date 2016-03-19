"use strict";
const core = require('./db.core');
const MongoClient = require('mongodb').MongoClient;
const Json = require('../jsonWrap');
const dbFindTimeKey = "DBTime";
class App extends core {
  constructor(dbSource, auth) {
    super(dbSource, auth);
  }

  insertOne(json) {
    var _DBName = this._DBName,
      _DBCollection = this._DBCollection,
      currentData = this._dealFields(json);
    var start = new Date();
    return new Promise((resolve, reject)=> {
      MongoClient.connect(_DBName, (err, db)=> {
        if (err) {
          db.close();
          reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
        } else {
          this.auth(db).then(()=> {
            var collection = db.collection(_DBCollection);
            collection.insertOne(currentData).then(function (result) {
              resolve(Json.success({
                  "insertedCount": result.insertedCount,
                  "_id": String(result.insertedId)
                },
                {[dbFindTimeKey]: new Date() - start + 'ms'}), result);
            }).catch((err)=> {
              reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}), err);
            }).always(()=> {
              db.close();
            })
          }).catch(err=> {
            db.close();
            reject(err);
          })
        }
      })
    });
  };

  insertMany(json) {
    var _DBName = this._DBName,
      _DBCollection = this._DBCollection,
      currentData = this._dealFields(json);
    return new Promise((resolve, reject)=> {
      MongoClient.connect(_DBName, (err, db)=> {
        if (err) {
          db.close();
          reject(err);
        } else {
          this.auth(db).then(()=> {
            var collection = db.collection(_DBCollection);
            collection.insertMany(currentData).then(function (result) {
              resolve(result);
            }).catch(()=> {
              reject(err);
            }).always(()=> {
              db.close();
            })
          }).catch(err=> {
            db.close();
            reject(err);
          })
        }
      })
    });
  };
}
module.exports = App;
