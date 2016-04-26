'use strict';
var config = require('../config');
var dbSource = config.dbSource;
const path = require('path');

const ObjectId = require('mongodb').ObjectID,
  DBHelperFind = require(path.join(config.path.modsPath, 'db/db.find')),
  DBHelperInsert = require(path.join(config.path.modsPath, 'db/db.insert')),
  DBHelperTools = require(path.join(config.path.modsPath, 'db/db.tools'));

var jwt = require(path.join(config.path.modsPath, "jwt"));

const updateArticleViews = function (articleId) {
  return new DBHelperTools(dbSource.blogDetail).updateArticleViews(articleId);
};

const getArticleDetail = function (dbQuery) {
  return new DBHelperFind(dbSource.blogDetail).findOne(dbQuery);
};

const getArticleList = function (dbQuery, options) {
  return new DBHelperFind(dbSource.blogList).find(dbQuery, options);
};

const getReply = function (dbQuery, options) {
  return new DBHelperFind(dbSource.reply).find(dbQuery, options);
};

const insertReply = function (data, userId) {
  return new DBHelperInsert(dbSource.reply).insertOne({
    "articleDbId": data.articleDbId,
    "articleId": data.articleId,
    "replyTo": data.replyTo,
    "replyUser": {
      "id": jwt.decode.decode(userId),
      "content": data.replyUser.content,
      "name": data.replyUser.name,
      "time": data.replyUser.time,
      "avatar": data.replyUser.avatar
    }
  });
};
module.exports = {
  article: {
    getArticleDetail: getArticleDetail,
    getArticleList: getArticleList,
    updateArticleViews: updateArticleViews
  },
  reply: {
    getReply: getReply,
    insertReply: insertReply
  }
};
