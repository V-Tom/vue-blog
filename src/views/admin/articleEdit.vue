<template>
  <section>
    <div class="container article-edit">
      <div class="article-edit-inner">
        <div class="article-edit-control">
          <label>
            <input type="text" v-model="article.title " name="title">
          </label>
          <label>
            <input type="text" v-model="article.subTitle">
          </label>
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
          this.article = result.data;
        })
      }
    },
    filters: {
      marked: marked
    }
  }
</script>
<style lang="stylus">
  @import '../../style/articleEdit.stylus';
</style>

