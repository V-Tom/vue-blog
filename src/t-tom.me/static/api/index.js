'use strict';
import {ArticleResource,ReplyResource,BlogListResource,ToolsResource,AuthResource} from './resources'

export const BlogApi = {
  getBlogList: (limit, page, tagName)=> {
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
  createArticle: (data)=> {
    return ArticleResource.save({
      type: "new"
    }, data)
  }
};

export const ReplyApi = {
  getUserAuthorize: ()=> {

  },
  addReply: (data) => {
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
  getVerifyCode: ()=> {
    return ToolsResource.get({
      type: 'getVerifyCode'
    })
  }
};

export const AuthApi = {
  login: (data)=> {
    return AuthResource.save({
      type: "login"
    }, data)
  },
  logout: ()=> {
    return AuthResource.get({
      type: "logout"
    })
  }
};

