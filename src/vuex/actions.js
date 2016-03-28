'use strict';
import * as api from  '../api'
import * as types from './types'
import marked from '../libs/markdown/marked'
import Notification from '../components/notification'
import Prism from '../libs/markdown/prism'

export const getArticleDetail = ({dispatch,router,_vm}, articleId, cb)=> {
  debugger;
  api.ArticleApi.getArticleDetail(articleId).then(response=> {
    if (response.ok) {
      response = response.data;
      if (response.data && response.success) {
        let article = response.data;
        article.content = marked(article.content);
        dispatch(types.GET_ARTICLE_DETAIL, article);
        _vm.$nextTick(()=> {
          Prism && Prism.highlightAll(false);
        });
        cb && cb();
      } else {
        Notification.error('啊哦,没有找到该文章~2秒后将会跳转到文章列表!', 2, function () {
          router.go({
            name: "blog"
          })
        })
      }
    } else {
      Notification.error('啊哦,没有找到该文章~2秒后将会跳转到文章列表!', 2, function () {
        router.go({
          name: "blog"
        })
      })
    }
  }).catch(err=> {
    Notification.error('啊哦,没有找到该文章~2秒后将会跳转到文章列表!', 2, function () {
      router.go({
        name: "blog"
      })
    })
  });
};
