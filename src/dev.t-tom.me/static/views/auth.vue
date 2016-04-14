<template>
  <section class="admin-page container animation" transition="page-fade">
    <div class="login-box">
      <p>welcome to t-tom.me admin page</p>
      <p>Login in. To see it in action.</p>
      <form method="post" action="javascript:void(0)" @submit="login">
        <label>
          <input type="text" v-model="user" autocomplete="off" title="user" name="user" placeholder="Username" autofocus
                 tabindex="1"
                 required>
        </label>
        <label>
          <input type="password" v-model="pwd" autocomplete="off" title="pwd" name="pwd" placeholder="Password"
                 tabindex="2"
                 required>
        </label>
        <button type="submit" tabindex="3">login</button>
      </form>
      <small>© 2016 dev.t-tom.me</small>
    </div>
  </section>
</template>
<script type="es6">
  import Notification from '../components/notification'
  import {loader} from '../vuex/types'
  import {AuthApi} from '../api'
  export default{
    name: "admin",
    data(){
      return {
        user: "",
        pwd: "",
        tryCount: 0
      }
    },
    ready(){
    },
    route: {},
    methods: {
      login: function (ev) {
        if (!this.user || !this.pwd) {
          ev.stopPropagation();
          ev.preventDefault();
          Notification.error("请输入账号和密码");
        }
        this.$store.dispatch(loader.SHOW_LOADER);
        AuthApi.login({
          user: this.user,
          pwd: this.pwd
        }).then(result=> {
          result = result.data;
          if (result.success) {
            this.$store.dispatch(loader.HIDE_LOADER);
            Notification.success('登陆成功~欢迎回来', ()=> {
              document.querySelector('body').classList.remove('authFailed');
              this.$router.go({'name': 'main'});
            });
          }
        }).catch(err=> {
          this.$store.dispatch(loader.HIDE_LOADER)
          this.tryCount++;
          Notification.error("登陆失败~请检查你的账号或密码");
        })
      }
    }
  }
</script>
<style lang="stylus">
  @import "../style/index.stylus";
</style>

