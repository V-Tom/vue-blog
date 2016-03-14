<template>
  <div class="discuss-wrap" transition="page-fade" v-show="show">
    <div class="discuss">
      <v-reply-box></v-reply-box>
      <v-reply-list></v-reply-list>
    </div>
  </div>
</template>
<script type="es6">
  export default{
    name: "discuss",
    data(){
      this.$on('sendArticleInfo', (data) => {
        setTimeout(()=> {
          this.show = true;
        }, 1500);
        return true;
      })
      return {
        show: false
      }
    },
    ready(){
      //因为这里 replyBox 和 replyList 是兄弟关系，如果replyBox评论成功，replyList需要更新
      //先发送到父节点然后由父节点广播下去,在replyList里面接收这个信息
      this.$on('addReplySuccess', (data)=> {
        this.$broadcast('addReplySuccess', data);
      });
    },
    components: {
      'v-reply-box': require('./replyBox.vue'),
      'v-reply-list': require('./replyList.vue')
    }
  }
</script>
<style lang="stylus">
  @import "../../style/discuss/index.stylus";
</style>
