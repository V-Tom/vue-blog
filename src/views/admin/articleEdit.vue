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
          <label>
            <span>标签: </span>
            <ul class="tags">
              <li v-for="tag in article.tags">
                <a href="javascript:void (0)" title="{{tag}}" v-text="tag"></a>
              </li>
            </ul>
          </label>
          <button type="button" @click="cancel">取消</button>
          <button type="button" @click="submit">提交</button>
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
  import {ArticleApi} from '../../api'
  import Notification from '../../components/notification'
  export default{
    name: 'article-edit',
    data(){
      return {
        empty: '',
        article: {
          content: '##hello world',
        }
      }
    },
    ready(){
    },
    route: {
      data(transition){
        //http://127.0.0.1:8080/#!/admin/articleEdit/i89b2l81cak9
        var articleId = transition.to.params.id;
        ArticleApi.getArticleDetail(articleId).then(result=> {
          result = result.data;
          if (result.data) {
            this.article = result.data;
            Notification.success('加载文章内容成功~', 1, null);
          } else {
            Notification.error('根据当前id获取不到文章' + articleId, 2, null);
          }
        }).catch(err=> {
          console.log(err)
          Notification.error('发生错误' + err.toString(), 2, null);
        })
      }
    },
    filters: {
      marked: marked
    },
    methods: {
      cancel: function (ev) {

      },
      submit: function (ev) {

      }
    }
  }
</script>
<style lang="stylus">
  @import '../../style/articleEdit.stylus';
</style>

