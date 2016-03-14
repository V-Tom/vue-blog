export default function (router) {
  "use strict";
  router.map({
    '*': {
      name: '404',
      component: require('./components/404.vue')
    },
    '/': {
      name: "index",
      component: require('./views/index.vue')
    },
    '/blog': {
      name: "blog",
      component: require('./views/router/blog.vue')
    },
    '/blog/:articleId': {
      name: "articleDetail",
      component: require('./views/router/article.vue')
    },
    '/blog?tag=/:tagName/': {
      name: "tag",
      component: require('./views/router/blog.vue')
    },
    '/labs': {
      name: "labs",
      component: require('./views/labs.vue')
    },
    '/about': {
      name: 'about',
      component: require('./views/about.vue')
    },
    '/message': {
      name: 'message',
      component: require('./views/message.vue')
    }
  });
}
