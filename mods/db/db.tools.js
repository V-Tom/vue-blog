"use strict";
const core = require('./db.core');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const Utils = require('../utils');
const Json = require('../jsonWrap');
const dbFindTimeKey = "DBTime";
class App extends core {
  constructor(dbSource) {
    super(dbSource);
  }

  updateArticleViews(articleId) {
    var _DBName = this._DBName,
      _DBCollection = this._DBCollection, start = new Date();
    return new Promise((resolve, reject)=> {
      MongoClient.connect(_DBName, (err, db)=> {
        if (err) {
          reject(err);
        } else {
          this.auth(db).then(()=> {
            var collection = db.collection(_DBCollection);
            collection.findOne({"_id": ObjectId(articleId)}).then(docs=> {
              var views = docs.views || 0;
              views++;
              collection.findOneAndUpdate({"_id": ObjectId(articleId)}, {"$set": {"views": views}}, {"upsert": false}).then(docs=> {
                resolve(docs);
              }).catch(err=> {
                reject(err);
              })
            }).catch(err=> {
              reject(err);
            })
          }).catch((err)=> {
            reject(err);
          })
        }
      })

    })
  }
}
module.exports = App;
