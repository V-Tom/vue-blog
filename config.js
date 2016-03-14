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
  host: "###:",
  port: "###",
  maxAge: 60 * 60 * 24 * 365,
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
  "###": "###",
  "###": {
    "###": "###",
    "###": {
      "blogList": "###",
      "articleReplyList": "###",
      "articleReplyUserInfo": "###",
      "articleDetail": "###"
    }
  }
};

const cdn = {
  "bucket": {
    "###": {
      "domain": "###",
      "isPrivate": false,
      "name": "###"
    }
  },
  "ACCESS_KEY": "###",
  "SECRET_KEY": "###"
};


module.exports = {
  app: App,
  apiVersion: apiVersion,
  session: session,
  cdn: cdn,
  dbBlog: db.blog
};
