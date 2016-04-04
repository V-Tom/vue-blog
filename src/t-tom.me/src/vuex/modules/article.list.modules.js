import {routerBlog} from '../types'

const state = {
  data: [],
  busy: false,
  limit: 10,
  page: 1,
  tagName: null,
  noData: false
};

const mutations = {
  [routerBlog.GET_ARTICLE_LIST](state, data, limit, page){
    state.data = data;
    if (data.length < limit) {
      state.noData = true;
    }
  }
};
export default{
  state, mutations
}
