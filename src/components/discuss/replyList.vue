<template>
  <div class="reply-list-wrap" transition="page-fade">
    <div class="reply-loading" v-if="!replyListReady">
      <div class="reply-loading-spinner ani-spinner"></div>
    </div>
    <ul class="reply-list">
      <li v-for="data in replyList">
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
  import {ReplyApi} from '../../api'
  import {emojiDecoding,MillisecondToDate} from '../../libs/utils/tools'
  export default{
    name: "reply-list",
    data(){

      this.$on('sendArticleInfo', function (data) {
        var articleId = data.articleId;
        this.articleId = articleId;
        setTimeout(() => {
          this.getReplyList(articleId);
        }, 300);
      });

      this.$on('addReplySuccess', function (data) {
        this.replyList.unshift(data);
      })

      return {
        articleId: null,
        replyListReady: false,
        replyList: []
      }
    },
    ready(){
    },
    methods: {
      getReplyList: function (articleId) {
        ReplyApi.getReply(10, 1, articleId).then(result=> {
          if (result.data.success) {
            result.data.data.forEach(item=> {
              var replyUser = item.replyUser;
              //replyUser.time.MillisecondToDate = MillisecondToDate(new Date(replyUser.time.UTCTime).getUTCSeconds())
              replyUser.content = emojiDecoding(item.replyUser.content);
            })
            this.replyList = result.data.data;
            this.replyListReady = true;
          }
        });
      },
    }
  }

</script>
<style lang="stylus">
  @import "../../style/discuss/replyList.stylus";
</style>
