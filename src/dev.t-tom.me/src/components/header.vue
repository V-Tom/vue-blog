<style>
</style>
<template>
  <header class="App_header" v-bind:class="active">
    <nav class="App_header_container">
      <div class="App_header_body container">
        <section class="App_nav_description" data-page="I Am A Full-stack Developer"></section>
        <section class="App_nav_logo">
          <i class="icon icon-logo"></i>
          <a href="/" data-page="0" title="full stack"></a>
          <button type="button" class="App_nav_toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </section>
        <section class="App_nav_bar">
          <ul>
            <li><a v-link="" data-page="1" title="blog"><i class="icon icon-blog"></i></a></li>
            <li><a v-link="" data-page="2" title="labs"><i class="icon icon-labs"></i></a></li>
          </ul>
          <ul>
            <li><a v-link="" data-page="3" title="me"><i class="icon icon-me"></i></a></li>
            <li><a v-link="" data-page="4" title="message"><i class="icon icon-message"></i></a></li>
          </ul>
        </section>
      </div>
    </nav>
  </header>
</template>
<script type="es6">
  'use strict';
  export default{
    name: "header",
    methods: {}
  }
</script>
<style lang="stylus" scoped>
  @import "../style/header.stylus";
</style>
