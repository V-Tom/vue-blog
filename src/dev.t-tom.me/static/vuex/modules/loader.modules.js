import {loader} from '../types'

const state = {
  show: false,
  msg: 'loading...'
};

const mutations = {
  [loader.SHOW_LOADER](state, msg = "loading..."){
    state.show = true;
  },
  [loader.HIDE_LOADER](state, msg = "loading..."){
    state.show = false;
  }
};
export default{
  state, mutations
}
