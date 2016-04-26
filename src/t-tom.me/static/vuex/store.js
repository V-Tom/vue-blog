'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import articleDetail from './modules/article.detail.modules'
import articleList from './modules/article.list.modules'
import loader from './modules/loader.modules'
import header from './modules/header.modules'
import discussList from './modules/discuss.list.modules'

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    loader,
    header,
    articleDetail,
    articleList,
    discussList
  },
  strict: process.env.NODE_ENV == "development",
  middlewares
})
