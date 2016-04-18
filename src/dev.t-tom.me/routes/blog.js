const express = require('express');
const router = express.Router();

const controller = require('../controller/blog');
const authController = require('../controller/auth');
const Json = require('../../../mods/jsonWrap');
const ObjectId = require('mongodb').ObjectID;

//更新文章详情
router.put('/article/update', (req, res)=> {
  //authController.auth.authAdmin().then(result=> {
  //  if (req.session.user === result.data.name && req.session.pwd === result.data.pwd) {
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
  //  res.status(403).json(Json.error("查询用户权限错误", {err: err.message})).end();
  //});
});


//获取文章详情
router.get('/article/get', (req, res)=> {
  var query = req.query, id, dbQuery;
  id = query.articleId;
  dbQuery = {"articleId": id};

  //authController.auth.authAdmin().then(result=> {
  //  if (req.session.user === result.data.name && req.session.pwd === result.data.pwd) {
      controller.article.getArticleDetail(dbQuery).then(result=> {
        if (result.success) {
          res.status(200).json(result);
        }
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
  //authController.auth.authAdmin().then(result=> {
  //  if (req.session.user === result.data.name && req.session.pwd === result.data.pwd) {
      controller.article.insertNewArticle(req.body).then(result=> {
        res.status(200).json(Json.success("创建文章成功")).end();
      }).catch(err=> {
        res.status(500).json(Json.success("创建文章失败")).end();
      });
    //} else {
    //  res.status(403).json(Json.error("未知用户权限")).end();
    //}
  //}).catch(err=> {
  //  res.status(403).json(Json.error("查询用户权限错误")).end();
  //})
});


module.exports = router;
