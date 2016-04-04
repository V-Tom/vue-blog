<style>
</style>
<template>
  <header class="App_header" v-scroll="scroll" v-bind:class="{'active':header.disable,'open':header.openHeaderMenu}">
    <nav class="App_header_container">
      <div class="App_header_body container">
        <section class="App_nav_description" data-page="I Am A Full-stack Developer"></section>
        <section class="App_nav_logo">
          <i class="icon icon-logo"></i>
          <a href="/" data-page="0" title="full stack"></a>
          <button type="button" class="App_nav_toggle" v-on:click.stop="showMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </section>
        <section class="App_nav_bar">
          <ul>
            <li><a v-link="{name:'blog'}" data-page="1" title="blog"><i class="icon icon-blog"></i></a></li>
            <li><a v-link="{name:'labs'}" data-page="2" title="labs"><i class="icon icon-labs"></i></a></li>
          </ul>
          <ul>
            <li><a v-link="{name:'about'}" data-page="3" title="me"><i class="icon icon-me"></i></a></li>
            <li><a v-link="{name:'message'}" data-page="4" title="message"><i class="icon icon-message"></i></a></li>
          </ul>
        </section>
      </div>
    </nav>
  </header>
</template>
<script type="es6">
  'use strict';
  import '../libs/vue/vue-scroll'
  import {VuexActions} from '../libs/utils/tools'
  import * as actions from '../vuex/actions/header.action'
  export default{
    name: "header",
    vuex: {
      getters: {
        header: (state)=>state.header
      },
      actions: VuexActions(actions)
    },
    methods: {
      scroll: function (isShow) {
        isShow ? this.showHeader() : this.hideHeader();
      },
      showMenu: function () {
        this.openHeaderMenu = !this.openHeaderMenu;
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "../style/header.stylus";
</style>
