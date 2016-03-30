<template>
  <section class="blog-detail-page" :class="{'active':article.articleMenu}" transition="page-slide">

    <div class="article-side-btn" :class="{'active':article.articleDetailReady}">
      <button type="button" class="article-menu" title="article menu"
              @click.stop="openArticleMenu"></button>
    </div>

    <div class="article-sidebar">
      <section class="article-sidebar-inner">
        <scrollspy :ready="article.articleDetailReady" :article="article.navigationArticle"></scrollspy>
      </section>
    </div>

    <div class="article-content-wrapper" @click.stop="ArticleMenuHide">
      <header class="article-intro-container" :style="{backgroundImage:'url('+ article.detail.intro.pic  +')'}">
        <section class="article-intro-mask"></section>
        <section class="article-intro-body container">
          <ul class="tags">
            <li v-for="(index,item) in article.detail.tags">
              <a v-link="{name:'tag',params:{tagName:item}}" title="{{item}}" v-text="item"></a>
            </li>
          </ul>
          <h1 class="article-title" v-text="article.detail.title"></h1>
          <h2 class="article-subheading" v-text="article.detail.subTitle"></h2>
          <p class="article-meta" v-text="article.detail.meta"></p>
        </section>
      </header>

      <div class="markdown-wrapper">
        <article class="markdown container article-content" v-html="article.detail.content"></article>
      </div>
      <discuss></discuss>
    </div>
  </section>
</template>

<script type="es6">
  'use strict';
  import {getArticleDetail,setHeaderLimit,openArticleMenu,hideArticleMenu} from '../../vuex/actions'
  import '../../libs/vue/vue-scrollSpy'

  import discuss from'../../components/discuss/index.vue'
  import scrollspy from '../../components/scrollSpy/index.vue'

  export default{
    name: 'articleDetail',
    components: {
      discuss, scrollspy
    },
    vuex: {
      getters: {
        article: function (state) {
          return state.articleDetail;
        }
      },
      actions: {
        getArticleDetail, setHeaderLimit, openArticleMenu, hideArticleMenu
      }
    },
    ready(){
      this.setHeaderLimit(this.$el.querySelector('header').offsetHeight - 50)
      console.info('article.vue Ready!')
    },
    route: {
      data(transition){

        var articleId = transition.to.params.articleId;
        //this.$parent.loader.show = true;

        this.getArticleDetail(articleId, function (article) {
          this.$nextTick(()=> {
            //向下面广播信息
            this.$broadcast('sendArticleInfo', {
              "articleId": article.articleId,
              "articleDbId": article._id
            });
          })
        }.bind(this));
      }
    },
    methods: {
      ArticleMenuHide: function () {
        if (this.article.articleMenu) {
          this.hideArticleMenu();
        }
      }
    }
  }
</script>
<style lang="stylus">
  @import "../../style/router/article.stylus";
  @import "../../style/markdown/markdown.stylus";
  @import "../../style/markdown/prism.stylus";
</style>
