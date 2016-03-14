<template>
  <div class="notification-wrapper" v-if="show">
    <div class="body slideInDown animation">
      <div class="content">
        <i class="icon icon-{{iconClass}}"></i>
        <span v-text="text"></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: "notification",
    replace: true,
    props: {
      show: {
        type: Boolean,
        default: true
      },
      text: {
        type: String,
        default: 'loading...'
      },
      iconClass: {
        type: String,
        default: null
      }
    },
    data(){
      return {}
    }
  }
</script>
<style lang="stylus">
  @import "../../style/notification/notification.stylus";
</style>
