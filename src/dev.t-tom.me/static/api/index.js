'use strict';
import {AuthResource,ArticleResource} from './resources'


export const AuthApi = {
  login: (data) => {
    return AuthResource.save({
      type: "login"
    }, data)
  },
  logout: () => {
    return AuthResource.get({
      type: "logout"
    })
  }
};
export const ArticleApi = {
  getArticleDetail: (articleId) => {
    return ArticleResource.get({
      type: "get",
      articleId: articleId
    })
  },
  updateArticleDetail: (articleId, data, git)=> {
    return ArticleResource.update({
      type: "update",
      articleId: articleId
    }, {
      data: data,
      git: git
    })
  },
  createArticle: (data) => {
    return ArticleResource.save({
      type: "new"
    }, data)
  }
};

