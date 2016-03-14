<template>
  <section>
    <div class="discuss-wrap">
      <v-reply-list :reply-list="replyList" v-if="replyList.length" class="animation fadeIn"></v-reply-list>
    </div>
  </section>
</template>
<script type="es6">
  import Notification from '../components/notification'
  import {formatDate,emojiDecoding} from '../libs/utils'
  import api from '../api'
  export default{
    name: "discess",
    data(){
      return {
        "emoji": false,
        "contentPlaceholder": "欢迎指出问题~\n暂不支持回复他人评论orz",
        "verifyCodePlaceholder": "点击获取验证码~",
        "verifyCode": {
          "code": null,
          "base64": null
        },
        "discuss": {
          "articleDbId": '5680a445ebe7aeac13790686',
          "articleId": '5270e1e5jc28',
          "replyUser": {
            "content": '',
            "name": null,
            "email": null,
            "site": '',
            "time": {
              "localTime": null,
              "UTCTime": null
            },
            "verifyCode": null
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
      this.getRelpyList();
    },
    route: {
      data(transition){

      }
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
      getRelpyList: function () {
        api.getReply(10, 1, '5270e1e5jc28').then(result=> {
          if (result.data.success) {
            result.data.data.forEach(item=> {
              item.replyUser.content = emojiDecoding(item.replyUser.content);
            })
            this.replyList = result.data.data;
          }
        });
      },
      changeAvatar: function (ev) {
        console.log(ev);
      },
      getVerifyCode: function () {
        if (this.verifyCode.code && this.verifyCode.base64) {
          return false;
        }
        this.verifyCodePlaceholder = "读取验证码中~";
        api.getVerifyCode().then(result=> {
          result = result.data;
          if (result.success) {
            this.verifyCode.code = result.data.code;
            this.verifyCode.base64 = result.data.base64;
            this.verifyCodePlaceholder = "请输入验证码";
            Notification.error('获取验证码为1js1Kdy4  测试功能,windows下无法执行Node-canvas!', 5, null);
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
        } else if (this.verifyCode.code != user.verifyCode) {
          Notification.error('请输入正确的验证码~!', 2, null);
          ev.preventDefault();
          ev.stopPropagation();
          return false;
        }

        var data = this.$get("discuss"), date = new Date();
        user.time.localTime = formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        user.time.UTCTime = date;

        api.addReply(data).then(result=> {
          result = result.data;
          if (result.success || result) {
            Notification.success('发表评论成功~!', 0.5, ()=> {
              //add to replyList
              this.replyList.unshift({
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
                "base64": null
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
      'v-eomji': require('../components/emoji.vue'),
      'v-reply-list': require('../components/discuss/replyList.vue')
    }
  }
</script>
<style lang="stylus">
  @import "../style/discuss/replyBox.stylus";
</style>
