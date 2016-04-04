'use strict';
var dbBlog = require('../config').db.dbBlog,
  dbUser = require('../config').db.dbUser;

const blogDetailDbSource = {
  source: {
    "DBName": dbBlog.port,
    "DBCollection": dbBlog.collection.articleDetail
  }
};
const blogListDbSource = {
  source: {
    "DBName": dbBlog.port,
    "DBCollection": dbBlog.collection.blogList
  }
};
const replyDbSource = {
  source: {
    "DBName": dbBlog.port,
    "DBCollection": dbBlog.collection.articleReplyList
  }
};
const replyUserInfoDbSource = {
  source: {
    "DBName": dbBlog.port,
    "DBCollection": dbBlog.collection.articleReplyUserInfo
  }
};

const userDbSource = {
  source: {
    "DBName": dbUser.port,
    "DBCollection": dbUser.collection.user
  }
};

module.exports = {
  blogDetail: blogDetailDbSource,
  blogList: blogListDbSource,
  reply: replyDbSource,
  replyUser: replyUserInfoDbSource,
  user: userDbSource
};
