'use strict';
import {routerBlog} from '../types'
import {BlogApi} from  '../../api'

const state = {
  data: [],
  busy: true,
  limit: BlogApi.getBlogListLimit,
  page: 0,
  tagName: null,
  noData: false
};

const mutations = {
  [routerBlog.GET_ARTICLE_LIST](state, data, limit, page){
    state.data = state.data.concat(data);
    if (data.length < limit) {
      state.noData = true;
    }
  },
  [routerBlog.LOAD_MORE](state){
    state.page += 1
  },
  [routerBlog.SET_TAG_NAME](state, tagName){
    state.tagName = tagName;
  },
  [routerBlog.TOGGLE_DATA_BUSY](state, value){
    state.busy = value;
  }
};
export default{
  state, mutations
}
