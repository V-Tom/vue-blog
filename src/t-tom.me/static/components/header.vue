<style>
</style>
<template>
  <header class="App_header" v-scroll="scroll" v-bind:class="{'active':header.disable,'open':header.openHeaderMenu}">
    <nav class="App_header_container">
      <div class="App_header_body container">
        <section class="App_nav_description" data-page="I Am A Full-stack Developer"></section>
        <section class="App_nav_logo">
          <i class="icon icon-logo"></i>
          <a href="/" title="full stack"></a>
          <button type="button" class="App_nav_toggle" v-on:click.stop="toggleMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </section>
        <section class="App_nav_bar">
          <ul>
            <li><a v-link="{name:'blog'}" title="blog"><i class="icon icon-blog"></i></a></li>
            <!--<li><a v-link="{name:'labs'}" title="labs"><i class="icon icon-labs"></i></a></li>-->
          </ul>
          <ul>
            <li><a v-link="{name:'about'}" title="me"><i class="icon icon-me"></i></a></li>
            <!--<li><a v-link="{name:'message'}" title="message"><i class="icon icon-message"></i></a></li>-->
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
