<style>
  @font-face {
    font-family: fontAwesome;
    src: url("http://cdn.t-tom.me/static/fonts/FontAwesome.otf");
    src: url("http://cdn.t-tom.me/static/fonts/fontawesome-webfont.eot");
    src: url("http://cdn.t-tom.me/static/fonts/fontawesome-webfont.ttf");
    src: url("http://cdn.t-tom.me/static/fonts/fontawesome-webfont.woff");
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
  @import "./style/common/emoji.stylus";
  @import "./style/common/animation.stylus";
  @import './style/articleCreate&&Update.stylus';
  @import "./style/markdown/markdown.stylus";
  @import "./style/markdown/prism.stylus";
</style>

