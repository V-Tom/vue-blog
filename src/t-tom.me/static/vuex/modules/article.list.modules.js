'use strict';
import {routerBlog} from '../types'
import {BlogApi} from  '../../api'

const state = {
  data: [],
  busy: true,
  limit: BlogApi.getBlogListLimit,
  page: 1,
  tagName: null,
  noData: false
};

const mutations = {
  [routerBlog.GET_ARTICLE_LIST](state, data, limit, page){
    state.page += 1;
    state.data = state.data.concat(data);
    if (data.length < limit) {
      state.noData = true;
    }
  },
  [routerBlog.SET_TAG_NAME](state, tagName){
    state.tagName = tagName;
  },
  [routerBlog.TOGGLE_DATA_BUSY](state, value){
    state.busy = value;
  },
  [routerBlog.RESET_BLOG_LIST](state){
    state.noData = false;
    state.page = 1;
    state.data = [];
  }
};
export default{
  state, mutations
}
