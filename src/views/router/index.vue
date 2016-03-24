<style scoped>

</style>

<template>
  <section class="index-page container animation" transition="page-fade" transition-mode="out-in">
    <h1>hello world</h1>
  </section>
</template>

<script type="es6">
  export default{
    data(){

    },
    ready(){
      this.$parent.loader.show = false;
    }
  }
</script>
