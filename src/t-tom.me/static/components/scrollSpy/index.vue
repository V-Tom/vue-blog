<template>
  <div class="article-scrollSpy">
    <ul>
      <li v-for="item in navigation" class="{{'level-'+item.level}}">
        <a v-if="item.offset" href="javascript:void (0)" data-offset="{{item.offset}}"
           v-text="item.target" @click.stop="scrollSpy"></a>
        <a target="_blank" v-else :href="item.link"><i class="icon icon-github"></i>{{item.target}}</a>
      </li>

    </ul>
  </div>
</template>
<script type="es6">
  export default{
    name: "scrollSpy",
    replace: true,
    props: {
      ready: {
        type: Boolean,
        default: false
      },
      article: {
        type: String,
        default: '.article-content'
      }
    },
    data(){
      return {
        navigation: []
      }
    },
    ready(){
      this.$watch('ready', ()=> {
        var data = [];
        data.push({
          target: "回到顶部~",
          level: 1,
          offset: 0
        });
        [].slice.call(document.querySelector(this.$data.article).querySelectorAll('[data-level]')).forEach(item=> {
          var id = item.getAttribute('id'), level = item.getAttribute('data-level');
          if (id && level) {
            data.push({
              target: id.replace(/^#/, ''),
              level: level,
              offset: item.offsetTop || item.getBoundingClientRect().top
            });
          }
        });
        data.push({
          target: "去评论~",
          level: 1,
          offset: document.querySelector('.discuss-wrap').offsetTop
        });
        data.push({
          target: "有bug?欢迎指出!",
          level: 1,
          link: this.$store.state.articleDetail.detail.githubArticleUrl ? this.$store.state.articleDetail.detail.githubArticleUrl : "https://github.com/V-Tom/blogArticle"
        });
        this.$set('navigation', data);
      });
    },
    methods: {
      scrollSpy: function (ev) {
        var target = ev.target, offset = target.getAttribute('data-offset');
        if (offset) {
          window.scrollTo(0, Number(offset) - 50);
        }
      }
    }
  }
</script>
<style lang="stylus">
  @import "../../style/scrollSpy/index.stylus";
</style>
