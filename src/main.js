import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMap from './router'
Vue.use(VueRouter);

Vue.config.debug = true;

Vue.transition('page-fade', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut',
  type: 'animation'
});

Vue.transition('page-slide', {
  enterClass: 'fadeInRight',
  leaveClass: 'fadeOutRight',
  type: 'animation'
});

const App = require('./app.vue');
const router = new VueRouter({
  hashbang: true,
  //history: true,
  saveScrollPosition: false,
  transitionOnLoad: true,
  linkActiveClass: 'v-link-active'
});

VueMap(router);

router.beforeEach(transition => {

  //header是否监听滚动和滚动距离和是否打开小屏幕下的header菜单
  transition.to.router.app.header.scrollLimit = 0;
  transition.to.router.app.header.disable = false;
  transition.to.router.app.header.openHeaderMenu = false;

  transition.next();
});

router.afterEach(transition=> {
  console.log('成功浏览到:' + transition.to.path);
});


router.start(App, "app");
