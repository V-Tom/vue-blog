<template>
  <div class="v-spinner" v-if="show">
    <div class="v-ring-container">
      <section class="v-ring v-ring-1"></section>
      <section class="v-ring v-ring-2"></section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loader',
    replace: true,
    props: {
      show: {
        type: Boolean,
        default: true
      },
      text: {
        type: String,
        default: 'loading...'
      }
    }
  }
</script>

<style lang="stylus">
  @import "../style/common/loading.stylus";
</style>
