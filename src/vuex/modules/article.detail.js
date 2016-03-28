import {GET_ARTICLE_DETAIL} from '../types'

const state = {
  detail: {
    intro: {
      pic: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    }
  },
  navigationArticle: '.article-content',
  articleDetailReady: false,
  openArticleMenu: false
};
const mutations = {
  [GET_ARTICLE_DETAIL](state, data){
    state.detail = data;
  }
};

export default{
  state, mutations
}
