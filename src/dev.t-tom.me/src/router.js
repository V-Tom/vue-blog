export default function (router) {
  "use strict";
  router.map({

    //404 page
    '*': {
      name: 'bug',
      component: require('./components/404.vue')
    },
    '/': {
      name: 'index',
      component: require('./views/index.vue'),
      auth: true
    },
    '/auth': {
      name: 'auth',
      component: require('./views/auth.vue'),
      auth: true
    },
    '/main': {
      name: 'main',
      component: require('./views/main.vue'),
      auth: true
    },
    '/createArticle': {
      name: 'createArticle',
      component: require('./views/createArticle.vue'),
      auth: true
    },
    '/updateArticle/:id': {
      name: 'updateArticle',
      component: require('./views/updateArticle.vue'),
      auth: true
    }
  });
}
