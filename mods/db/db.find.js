"use strict";
const core = require('./db.core');
const MongoClient = require('mongodb').MongoClient;
const Utils = require('../utils');
const Json = require('../jsonWrap');
const dbFindTimeKey = "DBTime";
class App extends core {
  constructor(dbSource, auth) {
    super(dbSource, auth);
  }

  find(query, cursor) {
    var _DBName = this._DBName,
      _DBCollection = this._DBCollection, start = new Date();
    return new Promise((resolve, reject)=> {
      if (typeof query !== 'object') {
        reject('query must be an object');
      } else {
        MongoClient.connect(_DBName, (err, db)=> {
          if (err) {
            db.close();
            reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
          } else {
            this.auth(db).then(()=> {
              var collection = db.collection(_DBCollection);
              if (cursor) {
                let key, CURSOR;
                CURSOR = collection.find(query);
                try {
                  for (key in cursor) {
                    if (cursor.hasOwnProperty(key)) {
                      CURSOR[key](cursor[key])
                    }
                  }
                } catch (ex) {
                  db.close();
                  reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
                }
                CURSOR.toArray().then((docs) => {
                  resolve(Json.success(docs, {[dbFindTimeKey]: new Date() - start + 'ms'}));
                }).catch((err)=> {
                  reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
                }).always(()=> {
                  db.close();
                });
              } else {
                collection.find(query).toArray().then((docs) => {
                  resolve(Json.success(docs, {[dbFindTimeKey]: new Date() - start + 'ms'}));
                }).catch((err)=> {
                  reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
                }).always(()=> {
                  db.close();
                });
              }
            }).catch(err=> {
              db.close();
              reject(err);
            });
          }
        });
      }
    });
  }

  findOne(query, options) {
    var _DBName = this._DBName,
      _DBCollection = this._DBCollection, start = new Date();
    return new Promise((resolve, reject)=> {
      if (typeof query !== 'object') {
        reject('query must be an object');
      } else {
        MongoClient.connect(_DBName, (err, db)=> {
          if (err) {
            db.close();
            reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
          } else {
            this.auth(db).then(()=> {
              var collection = db.collection(_DBCollection);
              collection.findOne(query, options).then((docs)=> {
                resolve(Json.success(docs, {[dbFindTimeKey]: new Date() - start + 'ms'}));
              }).catch(()=> {
                reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
              }).always(()=> {
                db.close();
              });
            }).catch(err=> {
              db.close();
              reject(err);
            })
          }
        });
      }
    });
  };

  findOneAndUpdate(filter, replaceDoc, options, type) {
    var _DBName = this._DBName, _DBCollection = this._DBCollection, currentOptions, start = new Date(),

    //默认是 $set 更新文档
      defaultUpdateType = "$set",

    //see http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findOneAndUpdate
      defaultOptions = {
        //Limits the fields to return for all matching documents.
        // 对匹配到的所有文档进行limit处理
        projection: null,
        //The maximum amount of time to allow the query to run.
        //最大查找时间
        maxTimeMS: null,
        //Determines which document the operation modifies if the query selects multiple documents.
        sort: null,
        //Upsert the document if it does not exist.
        // 如果文档不存在是否创建新文档
        upsert: false,
        //When false, returns the updated document rather than the original. The default is true.
        //如果设置为false，返回更新后的文档而不是新的文档
        returnOriginal: false
      };


    options && Utils.isObject(options) ?
      currentOptions = Utils.extendDeep(defaultOptions, options)
      : currentOptions = defaultOptions;


    //see https://docs.mongodb.org/v3.0/reference/operator/update-field/
    //see http://www.runoob.com/mongodb/mongodb-atomic-operations.html
    var updateTypeList = ['$inc', '$set', '$rename', '$mul', '$setOnInsert', '$unset', '$min', '$max', 'currentDate'];

    if (type && updateTypeList.indexOf(type) !== -1) {
      defaultUpdateType = type
    }

    return new Promise((resolve, reject)=> {
      if (!Utils.isObject(filter) || !Utils.isObject(replaceDoc)) {
        reject('filter or  replaceDoc must be an object at line 124');
      } else {
        MongoClient.connect(_DBName, (err, db)=> {
          if (err) {
            db.close();
            reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
          } else {
            this.auth(db).then(()=> {
              var collection = db.collection(_DBCollection);
              collection.findOneAndUpdate(filter, {[defaultUpdateType]: replaceDoc}, currentOptions).then((docs)=> {
                resolve(Json.success(docs, {[dbFindTimeKey]: new Date() - start + 'ms'}));
              }).catch((err)=> {
                reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
              }).always(()=> {
                db.close();
              });
            }).catch(err=> {
              db.close();
              reject(err);
            })
          }
        });
      }
    });
  };

  findOneAndDelete(filter, options) {
    var _DBName = this._DBName,
      _DBCollection = this._DBCollection,
      currentOptions, start = new Date(),
      defaultOptions = {
        //Limits the fields to return for all matching documents.
        // 对匹配到的所有文档进行limit处理
        projection: null,
        //The maximum amount of time to allow the query to run.
        //最大查找时间
        maxTimeMS: null,
        //Determines which document the operation modifies if the query selects multiple documents.
        sort: null
      };
    options ? Utils.isObject(options) ? currentOptions = Utils.extendDeep(defaultOptions, options)
      : currentOptions = defaultOptions : currentOptions = defaultOptions;
    return new Promise((resolve, reject)=> {
      if (!Utils.isObject(filter)) {
        reject('filter must be an object');
      } else {
        MongoClient.connect(_DBName, (err, db)=> {
          if (err) {
            db.close();
            reject(Json.error(err, {[dbFindTimeKey]: new Date() - start + 'ms'}));
          } else {
            this.auth(db).then(()=> {
              var collection = db.collection(_DBCollection);
              collection.findOneAndDelete(filter, currentOptions).then((docs)=> {
                resolve(Json.success(docs, {[dbFindTimeKey]: new Date() - start + 'ms'}));
              }).catch((err)=> {
                reject(Json.error(err,{[dbFindTimeKey]: new Date() - start + 'ms'}));
              }).always(()=> {
                db.close();
              });
            }).catch(err=> {
              db.close();
              reject(err);
            })
          }
        });
      }
    });
  }
}
module.exports = App;
