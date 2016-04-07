export default function (router) {
  "use strict";
  router.map({

    //404 page
    '*': {
      name: 'bug',
      component: require('./components/404.vue')
    },

    //router page
    '/': {
      name: "index",
      component: require('./views/index.vue')
    },
    '/blog': {
      name: "blog",
      component: require('./views/blog.vue')
    },
    '/blog/:articleId': {
      name: "articleDetail",
      component: require('./views/article.vue')
    },
    '/blog?tag=/:tagName/': {
      name: "tag",
      component: require('./views/blog.vue')
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
