const dbFind = require('./db.find');
const dbInsert = require('./db.insert');
const dbBlog = require('../../config').dbBlog;
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

var blogResource = {
  DBName: dbBlog.port,
  DBCollection: dbBlog.collection.articleDetail
};


var blogFind = function () {
  MongoClient.connect(dbBlog.port, (err, db)=> {
    var collection = db.collection(dbBlog.collection.articleDetail);
    collection.find({"tags": "Node"}).skip(0).limit(10).toArray().then(docs=> {
      console.log(docs.length);
      db.close();
    }).catch(err=> {
      console.log(err);
      db.close();
    })
  });
}

blogFind();
