'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import articleDetail from './modules/article.detail.modules'
import articleList from './modules/article.list.modules'
import loader from './modules/loader.modules'
import header from './modules/header.modules'

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);
Vue.config.debug = true

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
