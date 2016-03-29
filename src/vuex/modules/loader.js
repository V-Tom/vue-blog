import {SHOW_LOADER,HIDE_LOADER} from '../types'

const state = {
  show: false,
  msg: 'loading...'
};

const mutations = {
  [SHOW_LOADER](state, msg = "loading..."){
    state.show = true;
  },
  [HIDE_LOADER](state, msg = "loading..."){
    state.show = false;
  }
};
export default{
  state, mutations
}
