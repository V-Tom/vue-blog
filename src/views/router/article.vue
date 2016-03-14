<template>
  <section class="blog-detail-page" :class="{'active':openArticleMenu}"
           transition="page-slide"
           transition-mode="out-in">
    <div class="article-menu-btn" :class="{'active':articleDetailReady}">
      <button type="button" class="article-menu" @click.stop="showArticleMenu"></button>
    </div>
    <div class="article-menu-wrapper"></div>
    <div class="article-content-wrapper" @click.stop="hideArticleMenu">
      <header class="article-intro-container" :style="{backgroundImage:'url('+ article.intro.pic  +')'}">
        <section class="article-intro-mask"></section>
        <section class="article-intro-body container">
          <ul class="tags">
            <li v-for="(index,item) in article.tags">
              <a v-link="{name:'tag',params:{tagName:item}}" title="{{item}}" v-text="item"></a>
            </li>
          </ul>
          <h1 class="article-title" v-text="article.title"></h1>
          <h2 class="article-subheading" v-text="article.subTitle"></h2>
          <p class="article-meta" v-text="article.meta"></p>
        </section>
      </header>
      <div class="markdown-wrapper">
        <article class="markdown container article-content" v-html="article.content"></article>
      </div>
      <v-discuss></v-discuss>
    </div>
  </section>
</template>

<script type="es6">
  'use strict';
  import marked from '../../libs/markdown/marked'
  import Prism from '../../libs/markdown/prism'
  import {ArticleApi} from '../../api'
  import Notification from '../../components/notification'
  //1900 870
  //https://www.google.com.hk/imgres?imgurl=http://theodorelee.com/wp-content/uploads/2015/04/grunt-vs-gulp.jpg&imgrefurl=http://theodorelee.com/2015/04/take-a-big-gulp/&h=500&w=2000&tbnid=MhgRhJR-Fe-jDM:&docid=gwUIyiNl9jdfnM&ei=SVjiVs3iGcbmyQOInYfABQ&tbm=isch&ved=0ahUKEwiNq5n987fLAhVGc3IKHYjOAVgQMwhnKEEwQQ#h=500&w=2000
  //https://www.google.com.hk/imgres?imgurl=https://i.ytimg.com/vi/oFu7Wzr1_JA/maxresdefault.jpg&imgrefurl=https://www.youtube.com/watch?v%3DoFu7Wzr1_JA&h=913&w=1628&tbnid=wJm7J80bIlyV-M:&docid=vS_L4TvbH6pTvM&ei=41jiVsa9I-niywOf_YSgCA&tbm=isch&ved=0ahUKEwiGu9rG9LfLAhVp8XIKHZ8-AYQQMwgoKA0wDQ
  //https://www.google.com.hk/imgres?imgurl=http://stfalcon.com/uploads/images/56939ac4e5329.jpeg&imgrefurl=http://stfalcon.com/en/blog/post/grunt-vs-gulp&h=300&w=960&tbnid=wjrvk1cBoxnYsM:&docid=OmhrmHxAKeMFUM&ei=I1niVuWoFau5ygPH-pa4Cg&tbm=isch&ved=0ahUKEwilxo7l9LfLAhWrnHIKHUe9BacQMwhOKCgwKA
  //https://www.google.com.hk/imgres?imgurl=https://alexhunt.io/content/grunt-vs-gulp.jpg&imgrefurl=https://alexhunt.io/build-systems-grunt-vs-gulp/&h=360&w=880&tbnid=K7C4KcnFdcsulM:&docid=jZGZtZ_0l2oduM&ei=I1niVuWoFau5ygPH-pa4Cg&tbm=isch&ved=0ahUKEwilxo7l9LfLAhWrnHIKHUe9BacQMwgiKAcwBw&biw=1481&bih=867
  export default{
    name: 'articleDetail',
    data(){
      return {
        article: {
          intro: {
            pic: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          }
        },
        articleDetailReady: false,
        openArticleMenu: false
      }
    },
    ready(){
      //header是否监听滚动和滚动距离
      this.$parent.header.disable = true;
      this.$parent.header.scrollLimit = this.$el.querySelector('header').offsetHeight;

      window.scrollTo(0, 0);
      console.info('article.vue Ready!')
    },
    route: {
      data(transition){

        var articleId = transition.to.params.articleId;

        this.$parent.loader.show = true;


        ArticleApi.getArticleDetail(articleId).then(result=> {
          result = result.data;
          if (result.data && result.success) {

            result.data.content = marked(result.data.content);
            this.article = result.data;


            this.$nextTick(()=> {
              Prism.highlightAll(false);

              //重新设置一次滚动距离
              this.$parent.header.scrollLimit = this.$el.querySelector('header').offsetHeight - 50;

              setTimeout(function () {
                this.$parent.loader.show = false;
                this.articleDetailReady = true;
                //向下面广播信息
                this.$broadcast('sendArticleInfo', {
                  "articleId": result.data.articleId,
                  "articleDbId": result.data._id
                });
              }.bind(this), 300);

            })
          } else {
            Notification.error('啊哦,没有找到该文章~2秒后将会跳转到文章列表!', 1.5, function () {
              transition.to.router.go({
                name: "blog"
              })
            })
          }
        })
      }
    },
    methods: {
      showArticleMenu: function (event) {
        this.openArticleMenu = !this.openArticleMenu;
        this.articleDetailReady = false;
      },
      hideArticleMenu: function (event) {
        if (this.openArticleMenu == true) {
          this.openArticleMenu = false;
          this.articleDetailReady = true;
        }
      }
    },
    components: {
      'v-discuss': require('../../components/discuss/index.vue')
    }
  }
</script>
<style lang="stylus">
  @import "../../style/router/article.stylus";
  @import "../../style/markdown/markdown.stylus";
  @import "../../style/markdown/prism.stylus";
</style>
