"use strict";
import Vue from 'vue'
import  VueResource from 'vue-resource'
const domain = 'http://127.0.0.1:5000';
var devVersion = 'v1';
Vue.use(VueResource);

Vue.http.options.root = domain;
Vue.http.options.crossOrigin = true;
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';

Vue.http.interceptors.push({

  request: (request)=> {
    return request;
  },

  response: (response) => {
    return response;
  }

});
export const AuthResource = Vue.resource('dev/' + devVersion + '/auth/{type}');
export const ArticleResource = Vue.resource("dev/" + devVersion + "/blog/article/{type}");
