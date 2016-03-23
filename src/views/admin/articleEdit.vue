<template>
  <section>
    <div class="container article-edit">
      <div class="article-edit-inner">
        <div class="article-edit-control">
          <label>
            <span>标题: </span>
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
          <button type="button" @click.stop="cancel">取消</button>
          <button type="button" @click.stop="submit">提交</button>
          <br>
          <span>标签: </span>
          <ul class="tags">
            <li v-for="(index,item) in article.tags" track-by="$index">
              <a href="javascript:void (0)" title="{{item}}">
                <span v-text="item" @click.stop="editTags(index)"></span>
                <i class="icon icon-trash" @click.stop="deleteTags(index)" title="delete"></i>
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
  import marked from '../../libs/markdown/marked'
  import {ArticleApi,AdminApi} from '../../api'
  import Notification from '../../components/notification'
  export default{
    name: 'article-edit',
    data(){
      return {
        article: {
          content: '####读取数据中~:smile:',
        }
      }
    },
    ready(){
    },
    route: {
      data(transition){
        var articleId = transition.to.params.id;
        ArticleApi.getArticleDetail(articleId).then(result=> {
          result = result.data;
          if (result.data) {
            this.article = result.data;
            Notification.success('加载文章内容成功~');
          } else {
            Notification.error('根据当前id获取不到文章' + articleId);
          }
        }).catch(err=> {
          console.log(err)
          Notification.error('发生错误' + err.toString());
        })
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
        ArticleApi.updateArticleDetail(this.article._id, this.article).then((result) => {
          result = result.data;
          Notification.success('更新文章成功~\n耗时:' + result.DBTime);
        }).catch(err=> {
          Notification.error('更新文章失败~');
        })
      }
    }
  }
</script>
<style lang="stylus">
  @import '../../style/articleEdit.stylus';
</style>

