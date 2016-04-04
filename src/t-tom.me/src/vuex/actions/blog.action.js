'use strict';
import {loader,header,routerBlog} from '../types'
import {BlogApi} from  '../../api'


//设置header scroll limit
export const setHeaderLimit = ({dispatch,router,_vm}, limit)=> {
  dispatch(header.SET_HEADER_LIMIT, limit)
};

export const getArticleList = ({dispatch,router,_vm}, tag = null, limit = 10, page = 1)=> {
  dispatch(loader.SHOW_LOADER);
  dispatch(header.SHOW_HEADER);
  var query = _vm.route.query;
  if (Object.keys(query).length) {
    tag = query.tag.split('/');
    if (tag.length === 2) {
      tag = tag[1];
    } else {
      Notification.error('未能识别的路径~2秒后将会跳转到文章列表!', 1.5, function () {
        router.go({
          name: "blog"
        });
      })
    }
  }
  BlogApi.getBlogList(limit, page, tag).then(response=> {
    if (response.ok) {
      response = response.data;
      if (response.data && response.success) {
        let list = response.data;
        dispatch(routerBlog.GET_ARTICLE_LIST, list, limit, page);
        dispatch(loader.HIDE_LOADER);
      }
    }
  });
};
