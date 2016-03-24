<template>
  <section class="blog-list-page container animation" transition="page-fade" transition-mode="out-in"
           v-infinite-scroll="loadMore()">
    <article class="post-preview" v-for="(index,item) in data">
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
  import  '../../libs/vue/vue-infinite-scroll'
  import {BlogApi} from '../../api'
  import Notification from '../../components/notification'

  const getBlogList = ($vm, page, limit, tagName)=> {
    return new Promise((resolve, reject)=> {
      $vm.$parent.loader.show = true;
      BlogApi.getBlogList(limit, page, tagName).then(result=> {
        if (result.data.success) {
          resolve(result.data);
          setTimeout(()=> {
            $vm.$parent.loader.show = false;
          }, 300)
        } else {
          reject(result.data);
        }
      }, err=> {
        reject(err);
      });
    })
  };
  export default{
    name: "blog",
    data(){
      return {
        data: [],
        busy: false,
        limit: BlogApi.getBlogListLimit,
        page: 1,
        tagName: null,
        noData: false
      }
    },
    ready(){
    },
    route: {
      data(transition){
        this.$parent.loader.show = false;

        var self = this, query = transition.to.query, tagName;

        const init = function (tagName) {
          getBlogList(this, this.page, this.limit, tagName).then((result) => {
            //如果第一次加载的时候也就是第一页就发现数据不够了就显示为没有数据了
            self.data = result.data;
            if (self.data.length < 1 * this.limit) {
              self.$set("noData", true);
            }
          }).catch(err=> {
            Notification.error('出现未知错误~自动跳转中~', 1.5, function () {
              transition.to.router.go({
                name: "index"
              })
            })
            console.error(err);
          });
        }.bind(this);

        if (Object.keys(query).length) {
          tagName = transition.to.query.tag.split('/')
          if (tagName.length === 2) {
            this.tagName = tagName[1];
            init(tagName[1]);
          } else {
            Notification.error('未能识别的路径~2秒后将会跳转到文章列表!', 1.5, function () {
              transition.to.router.go({
                name: "blog"
              })
            })
          }
        } else {
          init();
        }
      }
    },
    methods: {
      loadMore: function () {
        if (this.data.length && !this.$get('noData')) {
          this.page++;
          getBlogList(this, this.page).then((result) => {
            if (result.data.length) {
              this.$set('data', this.$get('data').concat(result.data))
            } else {
              this.$set("noData", true);
            }
            this.$set('busy', false);
          }).catch(err=> {
            console.error(err);
          });
        }
      }
    }
  }
</script>
<style lang="stylus">
  @import "../../style/router/blog.stylus";
</style>
