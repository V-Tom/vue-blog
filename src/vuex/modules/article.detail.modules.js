import {GET_ARTICLE_DETAIL,OPEN_ARTICLE_MENU,HIDE_ARTICLE_MENU} from '../types'

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
  [GET_ARTICLE_DETAIL](state, data){
    state.detail = data;
    state.articleDetailReady = true;
  },
  [OPEN_ARTICLE_MENU](state){
    state.articleMenu = true;
  },
  [HIDE_ARTICLE_MENU](state){
    state.articleMenu = false;
  }
};

export default{
  state, mutations
}
