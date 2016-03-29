<template>
  <div class="v-spinner" v-if="loader.show">
    <div class="v-ring-container">
      <section class="v-ring v-ring-1"></section>
      <section class="v-ring v-ring-2"></section>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    name: 'loader',
    vuex: {
      getters: {
        loader: (state)=>state.loader
      }
    },
  }
</script>

<style lang="stylus">
  @import "../style/common/loading.stylus";
</style>
