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
  //res.status(200).json({
  //  success: true,
  //  timeShown: 1458664384689,
  //  data: {
  //    _id: "56e0517e41b75c6d27a100d9",
  //    title: "Grunt Gulp WebPack 初探",
  //    articleId: "i89b2l81cak9",
  //    author: "Nomand",
  //    meta: "Posted by Nomand on Mar 10, 2016",
  //    subTitle: "Preliminary Exploration Of Grunt Gulp WebPack",
  //    intro: {
  //      content: "",
  //      pic: "http://7xiqgq.com1.z0.glb.clouddn.com/article/images/i89b2l81cak9-header.jpg"
  //    },
  //    postTime: {
  //      localTime: "2016-03-09 23:37:03",
  //      UTCTime: "2016-03-09T16:46:52.011Z"
  //    },
  //    tags: [
  //      "Node",
  //      "gulp",
  //      "grunt",
  //      "webpack",
  //      "javascript",
  //      "es6"
  //    ],
  //    content: "## Grunt,Gulp,WebPack初探-1 \n### Grunt,Gulp,WebPack初探-2 \n####Grunt,Gulp,WebPack初探-3 \n## Grunt,Gulp,WebPack初探-1 \n### Grunt,Gulp,WebPack初探-2 \n####Grunt,Gulp,WebPack初探-3"
  //  },
  //  DBTime: "292ms"
  //});
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

//更新文章详情
router.put('/article/update', (req, res)=> {
  //authController.auth.authAdmin().then(result=> {
  //  if (req.session.name === result.data.name && req.session.pwd === result.data.pwd) {
  var postData = req.body.data, git = req.body.git, articleId = postData._id;
  delete postData._id;
  controller.article.updateArticleDetail({"_id": ObjectId(articleId)}, postData, git).then(result=> {
    res.status(200).json(result)
  }).catch(err=> {
    res.status(500).json(err);
  }).always(()=> {
    res.end();
  });
  //} else {
  //  res.status(403).json(Json.error("未知用户权限")).end();
  //}
  //}).catch(err=> {
  //  res.status(403).json(Json.error("查询用户权限错误")).end();
  //});

});

//创建新文章
router.post('/article/new', (req, res)=> {
  authController.auth.authAdmin().then(result=> {
    if (req.session.name === result.data.name && req.session.pwd === result.data.pwd) {
    } else {
      controller.article.insertNewArticle(req.body).then(result=> {
        res.status(200).json(Json.success("创建文章成功")).end();
      }).catch(err=> {
        res.status(500).json(Json.success("创建文章失败")).end();
      });
      res.status(403).json(Json.error("未知用户权限")).end();
    }
  }).catch(err=> {
    res.status(403).json(Json.error("查询用户权限错误")).end();
  })
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
