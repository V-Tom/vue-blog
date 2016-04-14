
<template>
  <div class="emoji-face-container" v-if="show">
    <a class="close" href="javascript:void(0)" @click.stop="emojiClose" title="close"></a>
    <section class="emoji-face-title" v-text="title"></section>
    <section class="emoji-face-list clear animation fadeIn">
      <a v-for="item in data" track-by="$index" v-on:click.stop="emojiClick" href="javascript:void (0)"
         title="{{item}}">
        <i class="emoji-face emoji-{{item}}" title="{{item}}"></i>
      </a>
    </section>
  </div>
</template>
<script type="es6">
  export default{
    name: 'emoji',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        title: "贱萌的emoji表情",
        data: ["smile", "grinning", "smiley", "blush", "relaxed", "wink", "heart-eyes", "kissing-heart", "kissing", "grin", "pensive", "unamused", "flushed", "relieved", "cry", "scream", "angry", "mask", "tired-face", "sleeping", "hushed", "hushed", "good", "bad", "two-men-holding-hands", "heart", "broken-heart", "gun"]
      }
    },
    ready(){
    },
    methods: {
      emojiClick: function (ev) {
        this.$dispatch('emojiClick', ev);
      },
      emojiClose: function (ev) {
        this.$dispatch('emojiClose', ev);
      }
    }
  }
</script>
<style lang="stylus">
  @import "../style/common/emoji.stylus";
</style>
