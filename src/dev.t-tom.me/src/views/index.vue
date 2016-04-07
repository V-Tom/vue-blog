<template>
  <section class="index-page container animation" transition="page-fade">
  </section>
</template>
<script type="es6">
  import Notification from '../components/notification'
  export default{
    name: 'index',
    route: {
      data(transaction){
        if ([].slice.call(document.querySelector('body').classList).indexOf('authFailed') == -1) {
          Notification.info("恭喜发现彩蛋~", ()=> {
            this.$router.go({
              'name': 'main'
            });
          });
        } else {
          Notification.info("恭喜发现彩蛋,但是需要登陆哦~", ()=> {
            this.$router.go({
              'name': 'auth'
            });
          });
        }
      }
    }
  }
</script>
<style lang="stylus"></style>
