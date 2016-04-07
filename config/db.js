'use strict';
const DB = "";
const db = {
  "users": {
    "port": "mongodb://" + DB + "/user",
    "collection": {
      "user": ""
    }
  },
  "cache": {
    "port": "mongodb://" + DB + "/cache",
    "collection": {
      "session": ""
    }
  },
  "blog": {
    "port": "mongodb://" + DB + "/blog",
    "collection": {
      "blogList": "",
      "articleReplyList": "",
      "articleReplyUserInfo": "",
      "articleDetail": ""
    }
  }
};
const blogDetailDbSource = {
  source: {
    "DBName": db.blog.port,
    "DBCollection": db.blog.collection.articleDetail
  }
};
const blogListDbSource = {
  source: {
    "DBName": db.blog.port,
    "DBCollection": db.blog.collection.blogList
  }
};
const replyDbSource = {
  source: {
    "DBName": db.blog.port,
    "DBCollection": db.blog.collection.articleReplyList
  }
};
const replyUserInfoDbSource = {
  source: {
    "DBName": db.blog.port,
    "DBCollection": db.blog.collection.articleReplyUserInfo
  }
};

const userDbSource = {
  source: {
    "DBName": db.users.port,
    "DBCollection": db.users.collection.user
  }
};
const sessionMaxAge = 36000;
const session = function (store) {
  return {
    "secret": "Nomand",
    "resave": false,
    "saveUninitialized": true,
    "cookie": {
      "maxAge": sessionMaxAge
    },
    "store": new store({
      "url": 'mongodb://' + DB + '/cache'
    })
  }
};

module.exports = {
  session: session,
  db: db,
  dbSource: {
    blogDetail: blogDetailDbSource,
    blogList: blogListDbSource,
    reply: replyDbSource,
    replyUser: replyUserInfoDbSource,
    user: userDbSource
  }
};
