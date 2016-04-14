<template>
  <form class="discuss-form" action="javascript:void(0)" method="post" @submit="submit">
    <section class="discuss-content">
      <a class="avatar" href="javascript:void(0)" @click="changeAvatar">
        <img
          src="https://o42cskze7.qnssl.com/static/images/userAvatar/avatar-1.jpg"/>
      </a>
      <div class="discuss-content-body">
            <textarea debounce="500" v-model="discuss.replyUser.content" name="message"
                      placeholder="{{contentPlaceholder}}" required></textarea>
        <div class="discuss-content-toolbar">
          <a href="javascript:void(0)" @click="emojiToggle" title="插入表情" v-bind:class="{'active':emoji}">
            <i class="icon icon-smile-face"></i>
          </a>
        </div>
      </div>
      <v-eomji :show="emoji"></v-eomji>
    </section>
    <section class="discuss-info">
      <div>
        <input v-model="discuss.replyUser.name" type="text" autocomplete="off" title="name" name="name"
               maxlength="6"
               @focus="focus"
               @blur="blur"
               required>
        <label>
          <i class="icon icon-user"></i>
          <span>昵称(必填)</span>
        </label>
      </div>
      <div>
        <input v-model="discuss.replyUser.email" type="email" autocomplete="off" name="mail" title="mail"
               maxlength="30"
               @focus="focus"
               @blur="blur" required>
        <label>
          <i class="icon icon-mail"></i>
          <span>邮箱(必填)</span>
        </label>
      </div>
      <div>
        <input v-model="discuss.replyUser.site" type="url" autocomplete="off" name="site" title="site"
               maxlength="20"
               @focus="focus"
               @blur="blur">
        <label>
          <i class="icon icon-website"></i>
          <span>网址</span>
        </label>
      </div>
    </section>
    <section class="discuss-submit">
      <div class="verify-code animation fadeIn" title="重新获取验证码" @click="getVerifyCode">
        <img :src="verifyCode.base64"/>
      </div>
      <input v-model="discuss.replyUser.verifyCode" type="text" name="verifyCode" autocomplete="off"
             @focus="getVerifyCode"
             placeholder={{verifyCodePlaceholder}}>
      <button type="submit">发布</button>
    </section>
  </form>
</template>
<script type="es6">
  import Notification from '../../components/notification'
  import {formatDate,emojiDecoding} from '../../libs/utils/tools'
  import {ToolsApi,ReplyApi} from '../../api'
  export default{
    name: "replyBox",
    data(){

      this.$on('sendArticleInfo', function (data) {
        this.discuss.articleId = data.articleId;
        this.discuss.articleDbId = data.articleDbId;
        return true;
      });

      return {
        "articleId": null,
        "emoji": false,
        "contentPlaceholder": "欢迎指出问题~\n请不要发送无用的评论,谢谢\n暂不支持回复他人评论orz",
        "verifyCodePlaceholder": "点击获取验证码~",
        "verifyCode": {
          "code": '',
          "base64": null,
          "timeShown": null
        },
        "discuss": {
          "articleDbId": null,
          "articleId": null,
          "replyUser": {
            "content": '',
            "name": null,
            "email": null,
            "site": '',
            "avatar": "http://cdn.t-tom.me/static/images/userAvatar/avatar-1.jpg",
            "time": {
              "localTime": null,
              "UTCTime": null
            },
            "verifyCode": ''
          },
          "replyTo": ''
        },
        replyList: []
      }
    },
    ready(){

      this.$on('emojiClick', function (ev) {
        var target = ev.target, title = target.getAttribute('title'), str = '[' + title + ']';
        var textarea = this.$el.querySelector('textarea'), startPos = textarea.selectionStart, endPos = textarea.selectionEnd,
          currentPos = startPos, content = textarea.value;
        currentPos += str.length;
        this.discuss.replyUser.content = content.substring(0, startPos) + str + content.substring(endPos, content.length);
        this.$nextTick(()=> {
          textarea.selectionStart = textarea.selectionEnd = currentPos;
        })
        this.$set('emoji', false);
        //首先在实例上触发它，然后沿着父链向上冒泡在触发一个监听器后停止，除非它返回 true。附加参数都会传给监听器回调
        //return true;
      });

      this.$on('emojiClose', function (ev) {
        this.$set('emoji', false);
      });

    },
    methods: {
      emojiToggle: function (ev) {
        this.emoji = !this.emoji;
      },
      focus: function (ev) {
        var target = ev.target, name = target.name;
        target.nextElementSibling.classList.add('active');
      },
      blur: function (ev) {
        if (ev.target.value.trim() === '') {
          ev.target.nextElementSibling.classList.remove('active');
        }
      },
      changeAvatar: function (ev) {
        Notification.info('更换头像暂不支持，努力开发中~');
      },
      getVerifyCode: function (ev) {
        if (this.verifyCode.code && this.verifyCode.base64) {
          if (ev.target.tagName === 'INPUT') {
            return false;
          } else {
            //半分钟获取一次
            if (new Date().getTime() - this.verifyCode.timeShown < 10000) {
              Notification.info('获取验证码频率10s一次哦~');
              return false;
            }
          }
        }
        this.verifyCodePlaceholder = "读取验证码中~";
        ToolsApi.getVerifyCode().then(result=> {
          result = result.data;
          if (result.success) {
            this.verifyCode = {
              "code": result.data.code,
              "base64": result.data.base64,
              "timeShown": result.timeShown
            };
            this.verifyCodePlaceholder = "请输入验证码";
          }
        }, err=> {
          Notification.error('获取验证码失败~!', 2, null);
          this.verifyCodePlaceholder = "获取验证码失败~!";
        })
      },
      submit: function (ev) {
        var user = this.discuss.replyUser;

        if (!this.verifyCode.code) {
          Notification.error('请输入验证码~!', 2, null);
          ev.preventDefault();
          ev.stopPropagation();
          return false;
        } else if (this.verifyCode.code.toLowerCase().trim() != user.verifyCode.toLowerCase().trim()) {
          Notification.error('请输入正确的验证码~!', 2, null);
          ev.preventDefault();
          ev.stopPropagation();
          return false;
        }

        var data = this.$get("discuss"), date = new Date();
        user.time.localTime = formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        user.time.UTCTime = date;
        ReplyApi.addReply(data).then(result=> {
          result = result.data;
          if (result.success || result) {
            Notification.success('发表评论成功~!', 0.5, ()=> {

              //add to replyList
              this.$dispatch('addReplySuccess', {
                "replyUser": {
                  "content": emojiDecoding(user.content),
                  "name": user.name,
                  "time": user.time
                }
              });
              //blur
              this.$el.querySelectorAll('input').blur;
              //重置用户输入内容

              this.verifyCode = {
                "code": null,
                "base64": null,
                "timeShown": null
              };

              this.discuss.replyUser = {
                "content": '',
                "name": null,
                "email": null,
                "site": null,
                "time": {
                  "localTime": null,
                  "UTCTime": null
                },
                "verifyCode": null
              }
            });
          }
        }, err=> {
          console.log(err);
          Notification.error('发表评论失败~!', 2, null);
        });
      }
    },
    components: {
      "v-eomji": require('../emoji.vue')
    }
  }
</script>
<style lang="stylus">
  @import "../../style/discuss/replyBox.stylus";
</style>
