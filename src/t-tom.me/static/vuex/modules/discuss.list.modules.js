'use strict';
import {discussList} from '../types'
const state = {
  articleId: null,
  replyListReady: false,
  replyList: []
};
const mutations = {
  [discussList.GET_ARTICLE_REPLY_LIST](state, data, articleId){
    state.replyList = data;
    state.articleId = articleId;
    state.replyListReady = true;
  },
  [discussList.ADD_A_NEW_REPLY](state, data){
    state.replyList.unshift(data);
  }
};
module.exports = {
  state, mutations
};
