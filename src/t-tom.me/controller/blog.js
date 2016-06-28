'use strict';
const config = require('../config');
const dbSource = config.dbSource;
const path = require('path');

const ObjectId = require('mongodb').ObjectID,
  DBHelperFind = require(path.join(config.path.modsPath, 'db/db.find')),
  DBHelperInsert = require(path.join(config.path.modsPath, 'db/db.insert')),
  DBHelperTools = require(path.join(config.path.modsPath, 'db/db.tools')),
  redisHelper=require(path.join(config.path.modsPath, 'redis')).helper,
  jwt = require(path.join(config.path.modsPath, "jwt"));

const updateArticleViews = function (articleId) {
  return new DBHelperTools(dbSource.blogDetail).updateArticleViews(articleId);
};

const getArticleDetail = function (dbQuery) {
  return new Promise((resolve,reject)=>{
    let key=`articleId:${dbQuery.articleId}`;
    redisHelper.get(key).then(data=>{
      let result;
      try{
        result=JSON.parse(data);
      }catch (ex){
        reject(ex);
      }
      delete result["DBTime"];
      result["poweredBy"]="redis";
      resolve(result);
    }).catch(err=>{
      if(err){
        reject(err);
      }else {
        new DBHelperFind(dbSource.blogDetail).findOne(dbQuery).then(result=>{
          if(result.success) {
            redisHelper.set(key, JSON.stringify(result), function () {
              resolve(result);
            });
          }else{
            reject(result);
          }
        }).catch(err=>{
          reject(err);
        })
      }
    });
  })
};

const getArticleList = function (dbQuery, options) {
  return new Promise((resolve,reject)=>{
    let key=`articleList:${dbQuery && dbQuery.tags ? dbQuery.tags: "all"}`;
    redisHelper.get(key).then(data=>{
      let result;
      try{
        result=JSON.parse(data);
      }catch (ex){
        reject(ex);
      }
      delete result["DBTime"];
      result["poweredBy"]="redis";
      resolve(result);
    }).catch(err=>{
      if(err){
        reject(err);
      }
      new DBHelperFind(dbSource.blogList).find(dbQuery, options).then(result=>{
        if(result.success){
          redisHelper.set(key, JSON.stringify(result), function () {
            resolve(result);
          });
        }else {
          reject(result);
        }
      }).catch(err=>{
        reject(err);
      })
    })
  });
};

const getReply = function (dbQuery, options) {
  let key=`articleId:${dbQuery.articleId}`;
  return new Promise((resolve,reject)=> {
    redisHelper.get(key).then(data=> {
      let result;
      try {
        result = JSON.parse(data);
      } catch (ex) {
        reject(ex);
      }
      delete result["DBTime"];
      result["poweredBy"] = "redis";
      resolve(result);
    }).catch(err=> {
      if (err) {
        reject(err);
      }else {
        new DBHelperFind(dbSource.reply).find(dbQuery, options).then(result=>{
          if(result.success){
            redisHelper.set(key, JSON.stringify(result), function () {
              resolve(result);
            });
          }else {
            reject(result);
          }
        }).catch(err=>{
          reject(err);
        })
      }
    })
  });
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
    getArticleDetail,
    getArticleList,
    updateArticleViews
  },
  reply: {
    getReply,
    insertReply
  }
};
