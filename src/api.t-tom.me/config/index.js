//CONFIG
"use strict";

const path = require('path');

const apiVersion = 'v1';


const App = {
  //
  root: ".",
  siteDomain: "api.t-tom.me",
  host: "120.0.0.1",
  port: 8000,
  maxAge: 6000,
  debug: false,
  routerTitle: {
    notFound: "404 page",
    error: "500 page"
  }
};
const session = function (store) {
  return {
    "secret": "Nomand",
    "sessionKey": "id",
    "resave": false,
    "proxy": false,
    "saveUninitialized": true,
    "cookie": {
      "secure": true,
      "maxAge": App.maxAge
    },
    "store": new store({
      "url": ''
    })
  }
};
const db = {
  "users": {
    "port": "",
    "collection": {
      "user": "user"
    }
  },
  "cache": {
    "port": "",
    "collection": {
      "session": "sessions"
    }
  },
  "blog": {
    "port": "",
    "collection": {
      "blogList": "",
      "articleReplyList": "",
      "articleReplyUserInfo": "",
      "articleDetail": ""
    }
  }
};

const cdn = {
  "bucket": {
    "node": {
      "domain": "",
      "isPrivate": false,
      "name": "node"
    }
  },
  "ACCESS_KEY": "",
  "SECRET_KEY": ""
};

const filePath = {
  gitArticleMDPath: path.join(__dirname, '../../blogArticle'),
  modsPath: path.join(__dirname, '../../../mods')
};

module.exports = {
  app: App,
  apiVersion: apiVersion,
  session: session,
  cdn: cdn,
  path: filePath,
  port: App.port,
  db: {
    dbBlog: db.blog,
    dbUser: db.users
  },
  env: App.env
};
