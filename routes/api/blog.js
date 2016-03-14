"use strict";

const FS = require('fs');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID,
  MarkDownHelper = require('../../mods/markdown.helper'),
  DBHelperFind = require('../../mods/db/db.find'),
  DBHelperInsert = require('../../mods/db/db.insert');

var dbBlog = require('../../config').dbBlog;
var Json = require('../../mods/jsonWrap');
//DB Source

const detailDbSource = {
    "DBName": dbBlog.port,
    "DBCollection": dbBlog.collection.articleDetail
  },
  blogListDbSource = {
    "DBName": dbBlog.port,
    "DBCollection": dbBlog.collection.blogList
  },
  replyDbSource = {
    "DBName": dbBlog.port,
    "DBCollection": dbBlog.collection.articleReplyList
  },
  replyUserInfoDbSource = {
    "DBName": dbBlog.port,
    "DBCollection": dbBlog.collection.articleReplyUserInfo
  };


//获取文章列表
router.get('/list/', (req, res)=> {
  var param = req.query, limit, page, tags, query = null;
  if (typeof param == 'object') {
    if (param.limit && param.page) {
      limit = Number(param.limit);
      page = Number(param.page);
      if (isNaN(limit) || isNaN(page)) {
        //分页查询错误
        res.status(200).json(json.error("分页查询错误!")).end();
      } else {
        query = {
          skip: limit * (page - 1),
          limit: limit
        }
      }
    } else {
      //暂时不允许不存在分页
      res.status(500).json(Json.error("暂时不允许不存在分页的查询!")).end();
    }
    tags = param.tag ? {"tags": String(param.tag)} : {};

    new DBHelperFind(blogListDbSource).find(tags, query).then(result=> {
      res.status(200).json(result);
    }).catch(err=> {
      res.status(500).json(err);
    }).always(()=> {
      res.end();
    });
  } else {
    res.status(404).end();
  }
});


//获取和更新文章详情
router.get('/detail/', (req, res)=> {
  var query = req.query, id, dbQuery;
  id = query.articleId;
  dbQuery = {"articleId": id};
  new DBHelperFind(detailDbSource).findOne(dbQuery).then(result=> {
    if (result.success) {
      res.status(200).json(result);
    }
  }).catch(err=> {
    res.status(500).json(err);
  }).always(()=> {
    res.end();
  })
}).post('/detail/', (req, res)=> {
  var body = req.body;
  var id = body.articleId, query = {"articleId": id};
  res.status(200).json({
    "error": "文章内容更新尚未完成"
  });

});


//获取文章的评论列表
router.get('/reply/list', (req, res)=> {
  var data = req.query, dbQuery, limit, page, articleId;
  limit = Number(data.limit);
  page = Number(data.page);
  articleId = data.articleId;
  dbQuery = {"articleId": articleId};
  new DBHelperFind(replyDbSource).find(dbQuery, {
    skip: limit * (page - 1),
    limit: limit
  }).then(result=> {
    if (result.success) {
      result.data.reverse();
      res.status(200).json(result);
    }
  }).catch(err=> {
    res.status(500).json(err);
  }).always(()=> {
    res.end();
  })
});

//对文章进行评论
router.post('/reply/add', (req, res)=> {
  var data = req.body;
  var insertUserInfo = ()=> {
    return new Promise((resolve, reject)=> {
      new DBHelperInsert(replyUserInfoDbSource).insertOne({
        articleDbId: data.articleDbId,
        articleId: data.articleId,
        name: data.replyUser.name,
        time: data.replyUser.time,
        email: data.replyUser.email,
        site: data.replyUser.site,
        ip: req.ip
      }).then(result=> {
        resolve(result)
      }).catch(err=> {
        reject(err);
      });
    });
  }, insertReplyContent = ()=> {
    return new Promise((resolve, reject)=> {
      new DBHelperInsert(replyDbSource).insertOne({
        "articleDbId": data.articleDbId,
        "articleId": data.articleId,
        "replyTo": data.replyTo,
        "replyUser": {
          "content": data.replyUser.content,
          "name": data.replyUser.name,
          "time": data.replyUser.time,
          "avatar": data.replyUser.avatar
        }
      }).then(result=> {
        resolve(result)
      }).catch(err=> {
        reject(err);
      });
    });
  };
  Promise.all([insertUserInfo(), insertReplyContent()]).then(result=> {
    if (result.length) {
      res.status(200).json(result);
    }
  }).catch(err=> {
    console.log(err);
    res.status(500).json(err);
  }).always(()=> {
    res.end();
  });
});

module.exports = router;
