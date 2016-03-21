/*
 Created by Administrator on 2015/8/26.
 Author:Nomand,
 Email:iamnomand@gmail.com
 This is A Node.js File
 */

//CONFIG

"use strict";

const apiVersion = 'v1';

const App = {
  //
  root: ".",
  siteDomain: "t-tom.me",
  author: "Nomand",
  env: "development",
  host: "localhost:",
  port: "4000",
  maxAge: 60 * 60 * 24,
  debug: false,
  routeTitle: {
    index: "一个全栈开发者的小窝"
  },
  mime: {
    ".html": "text/html",
    ".js": "application/x-javascript",
    ".json": "application/json",
    ".css": "text/css",
    ".ico": "image/x-icon",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".rar": "application/zip",
    ".zip": "application/zip",
    ".pdf": "application/pdf",
    ".txt": "text/plain"
  },
  fontEnd: {
    base: "./static/",
    index: "./static/index.html"
  }
};
const session = {};
const db = {
  "users": {
    "port": "mongodb://127.0.0.1:27017/users",
    "collection": {},
    auth: {
      "user": "",
      "pwd": ""
    }
  },
  "blog": {
    "port": "mongodb://139.196.194.79:27017/blog",
    "collection": {
      "blogList": "blogList",
      "articleReplyList": "articleReplyList",
      "articleReplyUserInfo": "articleReplyUserInfo",
      "articleDetail": "articleDetail"
    },
    "auth": {
      "user": "admin",
      "pwd": "zhangchi123"
    }
  }
};

const cdn = {
  "bucket": {
    "node": {
      "domain": "7xiqgq.com1.z0.glb.clouddn.com",
      "isPrivate": false,
      "name": "node"
    }
  },
  "ACCESS_KEY": "A1vNdjThH47GlwQSD51VdC4PDWF_mIq-VYD9kXi0",
  "SECRET_KEY": "SORzSSCAcMvduBGKCnQUtpb4wQ35awYtU68bi80L"
};


module.exports = {
  app: App,
  apiVersion: apiVersion,
  session: session,
  cdn: cdn,
  dbBlog: db.blog,
  env: App.env
};
