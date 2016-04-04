<template>
  <section class="blog-detail-page" :class="{'active':openArticleMenu}" transition="page-slide">
    <div class="article-side-btn" :class="{'active':articleDetailReady}">
      <button type="button" class="article-menu" title="article menu" @click.stop="showArticleMenu"></button>
    </div>

    <div class="article-sidebar">
      <section class="article-sidebar-inner">
        <v-scroll-spy :ready="articleDetailReady" :article="navigationArticle"></v-scroll-spy>
      </section>
    </div>

    <v-content @cilck.stop="hideArticleMenu"></v-content>
    <v-discuss></v-discuss>
  </section>
</template>
<script type="es6">
  export default{
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
      'v-content': require('./content.vue'),
      'v-discuss': require('../../../components/discuss/index.vue'),
      'v-scroll-spy': require('../../../components/scrollSpy/index.vue')
    }
  }
</script>
