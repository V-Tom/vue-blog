'use strict';
var config = require('../config');
var dbSource = config.dbSource;

var shell = require('../../../mods/shell');
const path = require('path');

const ObjectId = require('mongodb').ObjectID,
  DBHelperFind = require(path.join(config.path.modsPath, 'db/db.find')),
  DBHelperInsert = require(path.join(config.path.modsPath, 'db/db.insert')),
  DBHelperTools = require(path.join(config.path.modsPath, 'db/db.tools'));


const getArticleDetail = function (dbQuery) {
  return new DBHelperFind(dbSource.blogDetail).findOne(dbQuery);
};

const updateArticleDetail = function (dbQuery, doc, git) {
  return new Promise((resolve, reject)=> {
    new DBHelperFind(dbSource.blogDetail).findOneAndUpdate(dbQuery, doc).then(result=> {
      resolve(result);
      //10秒后再更新git repo
      setTimeout(function () {
        try {
          shell.git.updateArticleMD(config.path.gitArticleMDPath, git || "update file", result.data.value)
        } catch (ex) {
          console.error(ex.stack);
        }
      }, 10000);
    }).catch(err=> {
      reject(err)
    });
  });
};

const insertNewArticle = function (data) {
  return new Promise((resolve, reject)=> {
    new DBHelperInsert(dbSource.blogDetail).insertOne(data).then(result=> {
      resolve(result);
      //10秒后再更新git repo
      setTimeout(function () {
        try {
          shell.git.updateArticleMD(config.path.gitArticleMDPath, git || "update file", result.data.value)
        } catch (ex) {
          console.error(ex.stack);
        }
      }, 10000);
    }).catch(err=> {
      reject(err)
    });
  });
};


module.exports = {
  article: {
    getArticleDetail: getArticleDetail,
    updateArticleDetail: updateArticleDetail,
    insertNewArticle: insertNewArticle
  }
};
