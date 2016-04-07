import {routerArticle} from '../types'

const state = {
  detail: {
    intro: {
      pic: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    }
  },
  navigationArticle: '.article-content',
  articleDetailReady: false,
  articleMenu: false
};
const mutations = {
  [routerArticle.GET_ARTICLE_DETAIL](state, data){
    state.detail = data;
    state.articleDetailReady = true;
  },
  [routerArticle.OPEN_ARTICLE_MENU](state){
    state.articleMenu = true;
  },
  [routerArticle.HIDE_ARTICLE_MENU](state){
    state.articleMenu = false;
  },
  [routerArticle.SET_ARTICLE_READY_FALSE](state){
    state.articleDetailReady = false;
  }
};

export default{
  state, mutations
}
