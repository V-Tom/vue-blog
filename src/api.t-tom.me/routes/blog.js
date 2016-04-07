"use strict";

const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;


var controller = require('../controller/blog');
var authController = require('../controller/auth');
var Json = require('../../../mods/jsonWrap');

//获取文章列表
router.get('/list/', (req, res)=> {
  var param = req.query, limit, page, options = null, dbQuery = {};
  if (typeof param == 'object') {
    if (param.limit && param.page) {
      limit = Number(param.limit);
      page = Number(param.page);
      if (isNaN(limit) || isNaN(page)) {
        //分页查询错误
        res.status(200).json(json.error("分页查询错误!")).end();
      } else {
        options = {
          skip: limit * (page - 1),
          limit: limit
        }
      }
    } else {
      //暂时不允许不存在分页
      res.status(500).json(Json.error("暂时不允许不存在分页的查询!")).end();
    }
    dbQuery = param.tag ? {"tags": String(param.tag)} : {};

    controller.article.getArticleList(dbQuery, options).then(result=> {
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


//获取文章详情
router.get('/article/get', (req, res)=> {
  var query = req.query, id, dbQuery;
  id = query.articleId;
  dbQuery = {"articleId": id};

  controller.article.getArticleDetail(dbQuery).then(result=> {
    if (result.success) {
      res.status(200).json(result);
      controller.article.updateArticleViews(String(result.data._id));
    }
  }).catch(err=> {
    res.status(500).json(err);
  }).always(()=> {
    res.end();
  });
});

//获取文章的评论列表
router.get('/reply/list', (req, res)=> {
  var data = req.query, dbQuery, limit, page, articleId;
  limit = Number(data.limit);
  page = Number(data.page);
  articleId = data.articleId;
  dbQuery = {"articleId": articleId};
  controller.reply.getReply(dbQuery, {
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
  var insertUserInfo = ()=> {
    return new Promise((resolve, reject)=> {
      controller.reply.insertReplyUser(req).then(result=> {
        resolve(result)
      }).catch(err=> {
        reject(err);
      });
    });
  }, insertReplyContent = ()=> {
    return new Promise((resolve, reject)=> {
      controller.reply.insertReply(req).then(result=> {
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
