'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import articleDetail from './modules/article.detail'
import articleList from './modules/article.list'
import loader from './modules/loader'
import header from './modules/header'

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);
Vue.config.debug = debug

export default new Vuex.Store({
  modules: {
    loader,
    header,
    articleDetail,
    articleList
  },
  strict: debug,
  middlewares
})
