/**
 * Created by Administrator on 2016/3/8.
 */
import {ArticleResource,ReplyResource,BlogListResource,ToolsResource,AuthResource,AdminResource} from './resources'

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
  getBlogListByTag: function (limit, page, tag) {
    return BlogListResource.get({
      limit: limit,
      page: page,
      tag: tag
    })
  },
  getBlogListLimit: 10
};

export const ArticleApi = {
  getArticleDetail: function (articleId) {
    return ArticleResource.get({
      articleId: articleId
    })
  },
  updateArticleDetail: function (articleId, data) {
    return ArticleResource.update({
      articleId: articleId
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

export const AuthApi = {};

export const AdminApi = {};
