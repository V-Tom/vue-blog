'use strict';
import {loader,header,routerArticle} from '../types'
import {ArticleApi} from  '../../api'
import Notification from '../../components/notification'

import marked from '../../libs/markdown/marked'
import Prism from '../../libs/markdown/prism'


//打开article menu
export const openArticleMenu = ({dispatch,router,_vm})=> {
  dispatch(routerArticle.OPEN_ARTICLE_MENU);
};

//关闭article menu
export const hideArticleMenu = ({dispatch,router,_vm})=> {
  dispatch(routerArticle.HIDE_ARTICLE_MENU);
};

//设置header scroll limit
export const setHeaderLimit = ({dispatch,router,_vm}, limit)=> {
  dispatch(header.SET_HEADER_LIMIT, limit)
};

//获得文章详情
export const getArticleDetail = ({dispatch,router,_vm}, articleId, cb)=> {
  dispatch(loader.SHOW_LOADER);
  dispatch(header.HIDE_HEADER);
  dispatch(routerArticle.SET_ARTICLE_READY_FALSE);
  ArticleApi.getArticleDetail(articleId).then(response=> {
    if (response.ok) {
      response = response.data;
      if (response.data && response.success) {
        let article = response.data;
        article.content = marked(article.content);
        dispatch(routerArticle.GET_ARTICLE_DETAIL, article);
        _vm.$nextTick(()=> {
          Prism && Prism.highlightAll(false);
          dispatch(loader.HIDE_LOADER);
        });
        cb && cb.call(this, article);
      } else {
        Notification.error('啊哦,没有找到该文章~2秒后将会跳转到文章列表!', 2, ()=> {
          router.go({
            name: "blog"
          })
        })
      }
    } else {
      Notification.error('啊哦,没有找到该文章~2秒后将会跳转到文章列表!', 2, ()=> {
        router.go({
          name: "blog"
        })
      })
    }
  }).catch(err=> {
    Notification.error('啊哦,没有找到该文章~2秒后将会跳转到文章列表!', 2, () => {
      router.go({
        name: "blog"
      })
    })
  });
};
