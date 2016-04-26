<style scoped>

</style>

<template>
  <section class="about-page container animation" transition="page-fade" transition-mode="out-in">
    <p>
      我叫张弛，英文名 Nomand，用 V-Tom 这个ID混迹于网络。是一个喜欢音乐（尤其是纯音乐和卡农）的码农。
    </p>
    <br/>
    <p>
      最爱JavaScript,偶尔写写Python。在大学期间接触到vb和html，从此开始了我的程序之路至今。本博客repo:<a
      href="https://github.com/V-Tom/vue-blog">vue-blog</a>
    </p>
    <br/>
    <p>
      大量阅读写demo,用Node.js开发过几个应用,曾经接触过Vue.js并用之写了这个博客,正在开发react-native客户端中.
    </p>
    <br/>
    <p><b>联系我:</b></p>
    <ul>
      <li> Email: <span>iamnomand@gmail.com</span></li>
      <li> Github: <span><a href="https://github.com/V-Tom">V-Tom</a> </span></li>
    </ul>
    <br/>
    <p><b>技术栈:</b></p>
    <p>
      <small><b>前端:</b></small>
    </p>
    <ul>
      <li>多年 HTML(5) / CSS(3) / JavaScript 经验</li>
      <li>熟悉前端模块化规范</li>
      <li>熟悉使用 STYLUS (SASS) 等 css pre-processor</li>
      <li>熟悉使用 ES2015</li>
      <li>熟悉使用 Gulp 自动化构建,熟练使用 Webpack 等 bundle tools</li>
    </ul>
    <p>
      <small><b>后端:</b></small>
    </p>
    <ul>
      <li>熟悉javascript(Node.js)</li>
      <li>
        熟悉使用 Express.js 等 Node.js Server Framework
      </li>
      <li>熟悉使用并理解 Mysql && NoSQL(MongoDB) 数据库</li>
      <li>
        曾经使用过 Python(flask) 写后端开发工单系统
      </li>
    </ul>
    <p>
      <small><b>其他:</b></small>
    </p>
    <ul>
      <li>熟悉 Linux 环境（好吧其实是 osx）</li>
      <li>熟悉使用git && svn</li>
      <li>对新技术和新鲜事物充满好奇心</li>
      <li>拥有极强的学习能力和阅读英文文档能力</li>
      <li>热爱音乐,健身,电玩..自建MC服务器,要不要来一起创造世界?</li>
    </ul>
    <br/>
    <small>博客上线匆忙,未能写出一个比较好看的about page,不过简洁就是美,哇咔咔</small>
  </section>
</template>

<script type="es6">
  export default{
    data(){
      this.$store.dispatch("SHOW_HEADER");
    },
    ready(){
    }
  }
</script>
<style lang="stylus">
  @import "../style/router/about.stylus";
</style>
