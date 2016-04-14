<style>
  @font-face {
    font-family: fontAwesome;
    src: url("https://o42cskze7.qnssl.com/static/fonts/FontAwesome.otf");
    src: url("https://o42cskze7.qnssl.com/static/fonts/fontawesome-webfont.eot");
    src: url("https://o42cskze7.qnssl.com/static/fonts/fontawesome-webfont.ttf");
    src: url("https://o42cskze7.qnssl.com/static/fonts/fontawesome-webfont.woff");
    font-weight: normal;
    font-style: normal;
  }
</style>
<template>
  <v-header></v-header>
  <router-view></router-view>
  <v-footer></v-footer>
  <v-loader></v-loader>
</template>

<script type="es6">
  import {copyListener,writeEmojiStyle} from './libs/utils/funny'
  import store from './vuex/store'
  export default {
    name: "app",
    store,
    ready(){
      if (document.querySelectorAll('head style[data-type="emoji"]').length === 0) {
        writeEmojiStyle();
      }
      copyListener();
      document.addEventListener('click', (ev)=> {
        if ([].slice.call(ev.target.classList).indexOf('App_nav_toggle') == -1) {
          this.$store.dispatch("HIDE_MOBILE_MENU");
        }
      }, false)
    },
    components: {
      'v-header': require('./components/header.vue'),
      'v-footer': require('./components/footer.vue'),
      'v-loader': require('./components/loader.vue')
    }
  }
</script>
<style lang="stylus">
  @import "./style/common/reset.stylus";
  @import "./style/common/common.stylus";
  @import "./style/common/icon.stylus";
  @import "./style/common/animation.stylus";
</style>

