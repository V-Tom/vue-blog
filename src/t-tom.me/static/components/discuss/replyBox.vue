<template>
  <form class="discuss-form" action="javascript:void(0)" method="post" @submit="submit">
    <section class="discuss-content">
      <a class="avatar" href="javascript:void(0)">
        <img
          :src="discuss.replyUser.avatar"/>
      </a>
      <div class="discuss-content-body">
        <div class="discuss-login-mask" v-if="!isUserLogin">
          <p>请登录后发表评论~</p>
          <a href="javascript:void (0)" @click="login">
            <i class="icon icon-github"></i>
          </a>
        </div>

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
    <section class="discuss-info" v-if="false">
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
               maxlength="30"
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

      let userAvatarUrl = undefined, userName = undefined, isUserLogin = false;
      if (window.localStorage.getItem("NomandWebsiteLogin")) {
        userAvatarUrl = window.localStorage.getItem("userAvatarUrl");
        userName = window.localStorage.getItem("userName");
        isUserLogin = true;
      } else {
        userAvatarUrl = "https://o42cskze7.qnssl.com/static/images/userAvatar/avatar-1.jpg";
        userName = "游客";
      }
      return {
        "articleId": null,
        "isUserLogin": isUserLogin,
        "contentPlaceholder": "欢迎指出问题~\n请不要发送无用的评论,谢谢\n暂不支持回复他人评论orz",
        "verifyCodePlaceholder": "点击获取验证码~",
        "emoji": false,
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
            "name": userName,
            "avatar": userAvatarUrl,
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
      //focus: function (ev) {
      //  var target = ev.target, name = target.name;
      //  target.nextElementSibling.classList.add('active');
      //},
      //blur: function (ev) {
      //  if (ev.target.value.trim() === '') {
      //    ev.target.nextElementSibling.classList.remove('active');
      //  }
      //},
      login: function (ev) {
        let clientId = "2c5d30e472a317b5c328";
        window.open(`https://github.com/login/oauth/authorize?client_id=${clientId}&state=GitHub`, '登录~', "height=500, width=500, top=0, left=0,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=n o, status=no")
      },
      getVerifyCode: function (ev) {
        if (!this.isUserLogin) {
          Notification.info('请先登录~');
          return false;
        }

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
        let discuss = this.$get("discuss");
        const resetUser = ()=> {
          window.localStorage.removeItem("NomandWebsiteLogin");
          window.localStorage.removeItem("userAvatarUrl");
          window.localStorage.removeItem("userName");
          window.location.reload();
        };
        if (!this.verifyCode.code) {
          Notification.error('请输入验证码~!', 2, null);
          ev.preventDefault();
          ev.stopPropagation();
          return false;
        } else if (this.verifyCode.code.toLowerCase().trim() != discuss.replyUser.verifyCode.toLowerCase().trim()) {
          Notification.error('请输入正确的验证码~!', 2, null);
          ev.preventDefault();
          ev.stopPropagation();
          return false;
        }

        let date = new Date();

        discuss.replyUser.time.localTime = formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        discuss.replyUser.time.UTCTime = date;
        ReplyApi.addReply(discuss).then(data=> {
          let result = data.data;
          if (result && result.success) {
            Notification.success('发表评论成功~!', 0.5, ()=> {
              //add to replyList
              this.$dispatch('addReplySuccess', {
                "replyUser": {
                  "content": emojiDecoding(discuss.replyUser.content),
                  "name": discuss.replyUser.name,
                  "avatar": discuss.replyUser.avatar,
                  "time": discuss.replyUser.time
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

              this.discuss.replyUser.content = "";
              this.discuss.replyUser.time.localTime = null;
              this.discuss.replyUser.time.UTCTime = null;
              this.discuss.replyUser.verifyCode = "";

            });
          } else {
            Notification.error('发表评论失败~\n' + (result.err && result.err), 2, ()=> {
              resetUser();
            });
          }
        }, err=> {
          Notification.error('发表评论失败~', 2, () => {
            resetUser();
          });

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
