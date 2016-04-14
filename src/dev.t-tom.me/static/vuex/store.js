'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import loader from './modules/loader.modules'
const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);
Vue.config.debug = true

export default new Vuex.Store({
  modules: {
    loader
  },
  strict: debug,
  middlewares
})
