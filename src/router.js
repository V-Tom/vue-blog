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
      component: require('./views/router/index.vue')
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
      component: require('./views/router/labs.vue')
    },
    '/about': {
      name: 'about',
      component: require('./views/router/about.vue')
    },
    '/message': {
      name: 'message',
      component: require('./views/router/message.vue')
    },

    //admin page
    '/admin': {
      name: "admin",
      component: require('./views/admin/index.vue'),
      auth: true
    },
    '/admin/article/new': {
      name: "articleNew",
      component: require('./views/admin/index.vue'),
      auth: true
    },
    '/admin/articleEdit/:id': {
      name: "articleEdit",
      component: require('./views/admin/articleEdit.vue'),
      auth: true
    }
  });
}
