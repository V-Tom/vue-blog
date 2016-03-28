<template>
  <section class="blog-detail-page" :class="{'active':article.openArticleMenu}" transition="page-slide">

    <div class="article-side-btn" :class="{'active':article.articleDetailReady}">
      <button type="button" class="article-menu" title="article menu"
              @click.stop="showArticleMenu"></button>
    </div>

    <div class="article-sidebar">
      <section class="article-sidebar-inner">
        <scrollspy :ready="article.articleDetailReady" :article="article.navigationArticle"></scrollspy>
      </section>
    </div>

    <div class="article-content-wrapper" @click.stop="hideArticleMenu">
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
    </div>
    <discuss></discuss>
  </section>
</template>

<script type="es6">
  'use strict';
  import {ArticleApi} from '../../api'
  import {getArticleDetail} from '../../vuex/actions'
  import marked from '../../libs/markdown/marked'
  import Prism from '../../libs/markdown/prism'
  import Notification from '../../components/notification'
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
        getArticleDetail
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

        this.getArticleDetail(articleId, function () {
          this.$parent.loader.show = false;
          this.$nextTick(()=> {
            //重新设置一次滚动距离
            this.$parent.header.scrollLimit = this.$el.querySelector('header').offsetHeight - 50;

            //setTimeout(function () {
            //  this.$parent.loader.show = false;
            //  this.articleDetailReady = true;
            //  //向下面广播信息
            //  this.$broadcast('sendArticleInfo', {
            //    "articleId": result.data.articleId,
            //    "articleDbId": result.data._id
            //  });
            //}.bind(this), 300);

          })
        }.bind(this));
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
    }
  }
</script>
<style lang="stylus">
  @import "../../style/router/article.stylus";
  @import "../../style/markdown/markdown.stylus";
  @import "../../style/markdown/prism.stylus";
</style>
