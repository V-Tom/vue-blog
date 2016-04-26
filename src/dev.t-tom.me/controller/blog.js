'use strict';
var config = require('../config');
var dbSource = config.dbSource;

var shell = require('../../../mods/shell');
const path = require('path');

const ObjectId = require('mongodb').ObjectID,
  DBHelperFind = require(path.join(config.path.modsPath, 'db/db.find')),
  DBHelperInsert = require(path.join(config.path.modsPath, 'db/db.insert')),
  DBHelperTools = require(path.join(config.path.modsPath, 'db/db.tools'));


const getArticleDetail = (dbQuery) => {
  return new DBHelperFind(dbSource.blogDetail).findOne(dbQuery);
};

const updateArticleDetail = (dbQuery, doc, git)=> {
  return new Promise((resolve, reject)=> {
    let blogListModel = {
      id: doc.articleId,
      title: doc.title,
      subtitle: doc.subtitle || doc.subTitle,
      tags: doc.tags,
      preview: doc.intro ? doc.intro.preview : "",
      meta: doc.meta
    };
    new DBHelperFind(dbSource.blogList).findOneAndUpdate(dbQuery, blogListModel).then((result)=> {
      new DBHelperFind(dbSource.blogDetail).findOneAndUpdate(dbQuery, doc).then(result=> {
        resolve(result);

        //10秒后再更新git repo
        if (git) {
          setTimeout(()=> {
            try {
              shell.git.updateArticleMD(config.path.gitArticleMDPath, git || "update file", result.data.value)
            } catch (ex) {
              console.error(ex.stack);
            }
          }, 10000);
        }

      }).catch(err=> {
        reject(err)
      });
    }).catch(err=> {
      reject(err);
    })
  });
};

const insertNewArticle = (data, git)=> {
  return new Promise((resolve, reject)=> {
    new DBHelperInsert(dbSource.blogList).insertOne({
      articleId: data.articleId,
      title: data.title,
      subtitle: data.subtitle,
      tags: data.tags,
      preview: data.intro ? data.intro.content : "",
      meta: data.meta
    }).then(()=> {
      new DBHelperInsert(dbSource.blogDetail).insertOne(data).then(result=> {
        resolve(result);
        //10秒后再更新git repo
        if (git) {
          setTimeout(()=> {
            try {
              shell.git.updateArticleMD(config.path.gitArticleMDPath, git, result.data.value)
            } catch (ex) {
              console.error(ex.stack);
            }
          }, 10000);
        }
      }).catch(err=> {
        reject(err)
      });
    }).catch(err=> {
      reject(err);
    })
  });
};


module.exports = {
  article: {
    getArticleDetail: getArticleDetail,
    updateArticleDetail: updateArticleDetail,
    insertNewArticle: insertNewArticle
  }
};
