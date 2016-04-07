<template>
  <section>
    <div class="container article-edit">
      <div class="article-edit-inner">
        <div class="article-edit-control">
          <label>
            <span>文章标题: </span>
            <input type="text" v-model="article.title " name="title" required>
          </label>
          <label>
            <span>子标题: </span>
            <input type="text" v-model="article.subTitle" name="subTitle" required>
          </label>
          <label>
            <span>meta: </span>
            <input type="text" v-model="article.meta" name="meta" required>
          </label>
          <label>
            <span>git:</span>
            <input type="text" v-model="git" name="git" required>
          </label>
          <button type="button" @click.stop="cancel">取消</button>
          <button type="button" @click.stop="submit">提交</button>
          <br>
          <span>标签: </span>
          <ul class="tags">
            <li v-for="tag in article.tags" track-by="$index">
              <a href="javascript:void (0)" title="edit">
                <span v-text="tag" @click.stop="editTags($index)"></span>
                <i class="icon icon-trash" @click.stop="deleteTags($index)" title="delete"></i>
              </a>
            </li>
          </ul>
          <button type="button" @click="addTags">添加标签</button>
        </div>
        <section class="article-input">
          <label>
            <textarea v-model="article.content" debounce="300"></textarea>
          </label>
        </section>
        <section class="article-preview">
          <div class="markdown" v-html="article.content | marked"></div>
        </section>
      </div>
    </div>
  </section>
</template>
<script type="es6">
  import marked from '../libs/markdown/marked'
  import {ArticleApi} from '../api'
  import Notification from '../components/notification'
  export default{
    name: 'article-edit',
    data(){
      return {
        article: {
          content: '####新文章~:smile:',
          tags: []
        },
        git: ''
      }
    },
    ready(){
    },
    route: {
      data(transition){

        if ([].slice.call(document.querySelector('body').classList).indexOf('authFailed') !== -1) {
          Notification.info("恭喜发现彩蛋~但是需要登陆哦~", ()=> {
            this.$router.go({
              'name': 'auth'
            });
          });
          return false;
        }

        Notification.success('开写新文章~')
      }
    },
    filters: {
      marked: marked
    },
    methods: {
      addTags: function () {
        var tag = window.prompt('请输入想要添加的标签名称~');
        if (tag != '' && tag !== null) {
          this.article.tags && this.article.tags.push(tag);
        }
      },
      editTags: function (index) {
        var tag = window.prompt('请输入想要更改的标签名称~');
        if (tag != '' && tag !== null) {
          this.article.tags && this.article.tags.$set(index, tag);
        }
      },
      deleteTags: function (index) {
        this.article.tags && this.article.tags.splice(index, 1);
      },
      cancel: function (ev) {

      },
      submit: function (ev) {
        ArticleApi.createArticle(this.article, this.git).then((result) => {
          result = result.data;
          if (result.success) {
            Notification.success('创建文章成功~\n耗时:' + result.DBTime);
          } else {
            Notification.error('创建文章失败' + result.err);
          }
        }).catch(err=> {
          if (err.status == 403) {
            Notification.error('你没有权限~请登录', ()=> {
              this.$router.go({
                name: 'auth'
              })
            })
          } else {
            Notification.error('创建文章失败~' + err.data.err);
          }
        })
      }
    }
  }
</script>
<style lang="stylus">
  @import "../style/markdown/prism.stylus";
  @import '../style/articleCreate&&Update.stylus';
</style>

