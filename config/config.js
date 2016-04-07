"use strict";
//WHOLE SITE BASE CONFIG

const path = require('path');

const apiServerENV = "development";
const devServerENV = "development";

const App = {
  author: "Nomand",
  devVersion: 'v1',
  apiVersion: 'v1',
  sessionMaxAge: 36000,
  subDomain: {
    "dev": {
      port: 5000,
      domain: devServerENV === "development" ? "http://127.0.0.1:5000" : "http://dev.t-tom.me",
      env: devServerENV,
      routerTitle: {
        index: "一个全栈开发者的博客",
        notFound: "404 page",
        error: "500 page"
      }
    },
    "api": {
      port: 8000,
      domain: apiServerENV === "development" ? "http://127.0.0.1:8000" : "http://api.t-tom.me",
      env: apiServerENV,
      routerTitle: {
        index: "一个全栈开发者的博客",
        notFound: "404 page",
        error: "500 page"
      }
    },
    "base": {
      port: 4000,
      domain: "t-tom.me",
      env: "development",
      routerTitle: {
        index: "一个全栈开发者的博客",
        notFound: "404 page",
        error: "500 page"
      }
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
  modsPath: path.join(__dirname, '../mods')
};

const db = require('./db');
module.exports = {
  app: App,
  env: App.env,
  apiVersion: App.apiVersion,
  devVersion: App.devVersion,
  cdn: cdn,
  path: filePath,
  session: db.session,
  dbSource: db.dbSource,
  db: db.db
};
