<style scoped>

</style>

<template>
  <section class="about-page container animation" transition="page-fade" transition-mode="out-in">
    <p>this is about me</p>
  </section>
</template>

<script type="es6">
  export default{
    data(){
      this.$parent.header.showHeader = false;
    },
    ready(){
    }
  }
</script>
