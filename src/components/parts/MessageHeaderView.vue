<template>
  <div id="message-innerbody">
    <div class="author">Unlnown:</div>
    <a class="threadIcon nodecoration"  href="#" v-on:click="msgHeaderClick('edit')"><img class="grayscale icons" style="vertical-align: top;" :src="editd">Edit</a>
    <a class="mute threadIcon nodecoration" href="#" v-on:click="msgHeaderClick('mute')"><img class="grayscale icons" style="vertical-align: top;" :src="muted">Mute</a>
    <a class="icon threadIcon nodecoration" href="#" v-on:click="msgHeaderClick('icon')"><img class="grayscale icons" style="vertical-align: top;" :src="liked">Icon</a>
    <a class="reply threadIcon nodecoration" href="#" v-on:click="msgHeaderClick('reply')"><img class="grayscale icons" style="vertical-align: top;" :src="replyd">Reply</a>
    <a  style="float: right;" class="time">YYYY/MM/DD</a>
    <span class="icon threadIcon thumbsImg mr-0"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MessageHeaderView',
  data() {
    return {
      id: 'hoge',
      editd: require('~/assets/edit-d.png'),
      muted: require('~/assets/muted.png'),
      liked: require('~/assets/like-d.png'),
      replyd: require('~/assets/reply-d.png'),
    };
  },
  methods: {
    msgHeaderClick(eventType) {
      switch (eventType) {
        case 'edit':
          //
          break;
        case 'mute':
          //
          break;
        case 'icon':
          //
          break;
        case 'reply':
          //
          break;
        default:
          break;
      }
      return false;
    },
  },
});
</script>

<style lang="scss">
.message .unread {
  background-color: #acb976;
}


#message-innerbody {
  height: 26px;
}


.iconCount {
  font-size: 7pt;
  vertical-align: bottom;
}


.message-text {
  line-height: 1.5em;
  word-break: break-all;
}

.msgrow {
  line-height: 1.4em;
}

.author {
  color: #9C9C9C;
  font-size: 1em;
  float: left;
}

.threadIcon {
  float: right;
  margin-right: 8px;
  color: #9c9c9c;
}

.icons {
  margin-right: 3px;
}

.grayscale {
  -webkit-filter: grayscale(1%);
  filter: brightness(200%);
}

.nodecoration {
  text-decoration: none!important;
}

.time {
  float: right;
  color: #999;
  margin-right: 1em;
  margin-left: 1em;
}

.notification .time {
  color: #aaa;
  margin-right: 2.5em;
}

</style>
