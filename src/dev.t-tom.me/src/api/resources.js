"use strict";
import Vue from 'vue'
import  VueResource from 'vue-resource'
const domain = require('../../config').app.domain;
var devVersion = require('../../config').devVersion;
Vue.use(VueResource);

Vue.http.options.root = domain;
Vue.http.options.crossOrigin = true;
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';

Vue.http.interceptors.push({

  request: function (request) {
    return request;
  },

  response: function (response) {
    return response;
  }

});
export const AuthResource = Vue.resource('dev/' + devVersion + '/auth/{type}');
export const ArticleResource = Vue.resource("dev/" + devVersion + "/blog/article/{type}");
