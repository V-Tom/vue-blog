import {SHOW_HEADER,HIDE_HEADER,SET_HEADER_LIMIT} from '../types'
const state = {
  scrollLimit: 0,
  disable: false,
  openHeaderMenu: false
};

const mutations = {
  [SHOW_HEADER](state){
    state.disable = false;
  },
  [HIDE_HEADER](state){
    state.disable = true;
  },
  [SET_HEADER_LIMIT](state, limit){
    state.scrollLimit = limit;
  }
};

export default{
  state, mutations
}
