'use strict';
import {AuthResource,ArticleResource} from './resources'


export const AuthApi = {
  login: function (data) {
    return AuthResource.save({
      type: "login"
    }, data)
  },
  logout: function () {
    return AuthResource.get({
      type: "logout"
    })
  }
};
export const ArticleApi = {
  getArticleDetail: function (articleId) {
    return ArticleResource.get({
      type: "get",
      articleId: articleId
    })
  },
  updateArticleDetail: function (articleId, data, git) {
    return ArticleResource.update({
      type: "update",
      articleId: articleId
    }, {
      data: data,
      git: git
    })
  },
  createArticle: function (data) {
    return ArticleResource.save({
      type: "new"
    }, data)
  }
};

