<template>
  <div class="article-content-wrapper">
    <header class="article-intro-container" :style="{backgroundImage:'url('+ articleDetail.intro.pic  +')'}">
      <section class="article-intro-mask"></section>
      <section class="article-intro-body container">
        <ul class="tags">
          <li v-for="(index,item) in articleDetail.tags">
            <a v-link="{name:'tag',params:{tagName:item}}" title="{{item}}" v-text="item"></a>
          </li>
        </ul>
        <h1 class="article-title" v-text="articleDetail.title"></h1>
        <h2 class="article-subheading" v-text="articleDetail.subTitle"></h2>
        <p class="article-meta" v-text="articleDetail.meta"></p>
      </section>
    </header>
    <div class="markdown-wrapper">
      <article class="markdown container article-content" v-html="articleDetail.content"></article>
    </div>
  </div>
</template>
<script type="es6">
  export default{
    props: ['article']
  }

</script>
