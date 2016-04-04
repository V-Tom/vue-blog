import {header} from '../types'
const state = {
  scrollLimit: 0,
  disable: false,
  openHeaderMenu: false
};

const mutations = {
  [header.SHOW_HEADER](state){
    state.disable = false;
  },
  [header.HIDE_HEADER](state){
    state.disable = true;
  },
  [header.SET_HEADER_LIMIT](state, limit){
    state.scrollLimit = limit;
  }
};

export default{
  state, mutations
}
