<style>
  @font-face {
    font-family: fontAwesome;
    src: url("http://7xiqgq.com1.z0.glb.clouddn.com/static/fonts/FontAwesome.otf");
    src: url("http://7xiqgq.com1.z0.glb.clouddn.com/static/fonts/fontawesome-webfont.eot");
    src: url("http://7xiqgq.com1.z0.glb.clouddn.com/static/fonts/fontawesome-webfont.ttf");
    src: url("http://7xiqgq.com1.z0.glb.clouddn.com/static/fonts/fontawesome-webfont.woff");
    font-weight: normal;
    font-style: normal;
  }
</style>
<template>
  <v-header :scroll-limit.sync="header.scrollLimit" :disable.sync="header.disable"
            :open-header-menu.sync="header.openHeaderMenu"></v-header>
  <router-view></router-view>
  <v-footer></v-footer>
  <v-loader :show="loader.show" :text="loader.text"></v-loader>
</template>

<script type="es6">
  import {copyListener,writeEmojiStyle} from './libs/utils/funny'
  export default {
    name: "app",
    data () {
      return {
        loader: {
          show: false,
          text: 'loading...'
        },
        player: {
          show: false
        },
        header: {
          scrollLimit: 0,
          disable: true,
          openHeaderMenu: false
        }
      }
    },
    ready(){
      if (document.querySelectorAll('head style[data-type="emoji"]').length === 0) {
        writeEmojiStyle();
      }
      copyListener();
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

