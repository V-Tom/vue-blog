<template>
  <section class="main-page container animation" transition="page-fade">
    <button type="button" @click.stop="create">写文章</button>
    <button type="button" @click.stop="update">更改文章</button>
  </section>
</template>
<script type="es6">
  import Notification from '../components/notification'
  export default{
    name: "main",
    data(){
      return {}
    },
    route: {
      data(transaction){
        if ([].slice.call(document.querySelector('body').classList).indexOf('authFailed') !== -1) {
          Notification.info("恭喜发现彩蛋~但是需要登陆哦~", ()=> {
            this.$router.go({
              'name': 'auth'
            });
          });
          return false;
        }
      }
    },
    methods: {
      create(){
        this.$router.go({
          name: 'createArticle'
        })
      },
      update(){
        var id = window.prompt('请输入你要更改的文章id');
        if (id) {
          this.$router.go({
            name: "updateArticle",
            params: {
              id: id
            }
          })
        }
      }
    }
  }
</script>
<style lang="stylus">

</style>
