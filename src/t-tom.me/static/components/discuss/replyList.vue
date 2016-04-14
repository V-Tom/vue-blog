<template>
  <div class="reply-list-wrap" transition="page-fade">
    <div class="reply-loading" v-if="!reply.replyListReady">
      <div class="reply-loading-spinner ani-spinner"></div>
    </div>
    <ul class="reply-list">
      <li v-for="data in reply.replyList">
        <a href="javascript:void (0)">
          <img class="reply-user-avatar"
               :src="data.replyUser.avatar">
        </a>
        <div class="reply-main">
          <header><b v-text="data.replyUser.name"></b> 评论于
            <time datetime="{{data.replyUser.time.UTCTime}}" title="{{data.replyUser.time.localTime}}"
                  v-text="data.replyUser.time.localTime">
            </time>
          </header>
          <section v-html="data.replyUser.content"></section>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="es6">
  import {VuexActions} from '../../libs/utils/tools'
  import * as actions from '../../vuex/actions/discuss.list.action'
  export default{
    name: "reply-list",
    data(){

      this.$on('sendArticleInfo', function (data) {
        var articleId = data.articleId;
        setTimeout(() => {
          this.getReplyList(articleId);
        }, 300);
      });

      this.$on('addReplySuccess', function (data) {
        this.addANewReply(data);
      })
    },
    vuex: {
      getters: {
        reply: state=>state.discussList
      },
      actions: VuexActions(actions)
    }
  }

</script>
<style lang="stylus">
  @import "../../style/discuss/replyList.stylus";
</style>
