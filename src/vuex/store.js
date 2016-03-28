'use strict';
import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import articleDetail from './modules/article.detail'
const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);
Vue.config.debug = debug

export default new Vuex.Store({
  modules: {
    articleDetail
  },
  strict: debug,
  middlewares
})
