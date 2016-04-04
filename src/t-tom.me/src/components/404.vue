<template>
  <p>404 Not Found</p>
</template>
<script type="es6">
  import Notification from './notification'
  export default{
    name: "bug",
    data(){
      return {}
    },
    ready(){
    },
    route: {
      data(transition){
        Notification.error('sorry.您浏览的页面没有找到!将为您跳转~', 2, ()=> {
          transition.to.router.go({
            name: "index"
          })
        })
      }
    }
  }
</script>
<style lang="stylus">
  @import "../style/404.stylus";
</style>
