<template>
  <section class="blog-list-page container animation" transition="page-fade" transition-mode="out-in"
           v-infinite-scroll="getArticleList()">
    <article class="post-preview" v-for="(index,item) in articleList.data">
      <a v-link="{name:'articleDetail',params:{articleId:item.id}}">
        <h2 class="post-title ellipsis">{{ item.title }}</h2>
        <p class="post-subtitle ellipsis">{{ item.subtitle }}</p>
        <section class="post-content-preview">{{item.preview}}</section>
      </a>
      <p class="post-meta ellipsis">{{item.meta}}</p>
      <hr>
    </article>
  </section>
</template>

<script type="es6">
  'use strict';
  import  '../libs/vue/vue-infinite-scroll'
  import {VuexActions} from '../libs/utils/tools'
  import * as actions from '../vuex/actions/article.list.action'

  export default{
    name: "blog",
    vuex: {
      getters: {
        articleList: state =>state.articleList
      },
      actions: VuexActions(actions),
    },
    route: {
      data(transition){
        this.resetBlogListData();
        this.getArticleList();
      }
    }
  };
</script>
<style lang="stylus">
  @import "../style/router/blog.stylus";
</style>
