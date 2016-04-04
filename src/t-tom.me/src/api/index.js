'use strict';
import {ArticleResource,ReplyResource,BlogListResource,ToolsResource,AuthResource} from './resources'

export const BlogApi = {
  getBlogList: function (limit, page, tagName) {
    if (tagName) {
      return BlogListResource.get({
        limit: limit,
        page: page,
        tag: tagName
      });
    } else {
      return BlogListResource.get({
        limit: limit,
        page: page
      });
    }
  },
  getBlogListLimit: 10
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

export const ReplyApi = {
  addReply: function (data) {
    return ReplyResource.save({
      type: 'add'
    }, data)
  },
  getReply: function (limit, page, articleId) {
    return ReplyResource.get({
      type: 'list',
      limit: limit,
      page: page,
      articleId: articleId
    })
  }
};

export const ToolsApi = {
  getVerifyCode: function () {
    return ToolsResource.get({
      type: 'getVerifyCode'
    })
  }
};

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

