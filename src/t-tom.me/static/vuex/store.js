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
const debug = process.env.NODE_ENV == "development";

Vue.config.debug = debug;
export default new Vuex.Store({
  modules: {
    loader,
    header,
    articleDetail,
    articleList,
    discussList
  },
  strict: debug,
  middlewares
})
