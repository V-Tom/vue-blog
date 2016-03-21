<template>
  <section class="blog-detail-page" listen="articleDetailReady"
           :class="{'active':openArticleMenu}"
           transition="page-slide"
           transition-mode="out-in">

    <div class="article-side-btn" :class="{'active':articleDetailReady}">
      <button type="button" class="article-menu" title="article menu" @click.stop="showArticleMenu"></button>
    </div>

    <div class="article-sidebar">
      <section class="article-sidebar-inner">
        <v-scroll-spy :ready="articleDetailReady" :article="navigationArticle"></v-scroll-spy>
      </section>
    </div>

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
  import {ArticleApi} from '../../api'
  import marked from '../../libs/markdown/marked'
  import Prism from '../../libs/markdown/prism'
  import Notification from '../../components/notification'
  import '../../libs/vue/vue-scrollSpy'
  export default{
    name: 'articleDetail',
    data(){
      return {
        article: {
          intro: {
            pic: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          }
        },
        navigationArticle: '.article-content',
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
      },
      hideArticleMenu: function (event) {
        if (this.openArticleMenu == true) {
          this.openArticleMenu = false;
        }
      }
    },
    components: {
      'v-discuss': require('../../components/discuss/index.vue'),
      'v-scroll-spy': require('../../components/scrollSpy/index.vue')
    }
  }
</script>
<style lang="stylus">
  @import "../../style/router/article.stylus";
  @import "../../style/markdown/markdown.stylus";
  @import "../../style/markdown/prism.stylus";
</style>
