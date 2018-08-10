<template>
  <div class="wave">
    <div class="waves-container">
        <div class="messages" @keyup.up.stop="prevMessage" @keyup.down.stop="nextMessage">
          <div class="notification getprevmessages"></div>
          <MessageView :message-id="selectTargetID" v-for="item in replyItems" :key="item.id" ></MessageView>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MessageView from './MessageView.vue';
import EventBus from '../../libs/EventBus.ts';

export default Vue.component('WaveView', {
  name: 'WaveView',
  template: '#WaveView',
  components: {
    messageView: MessageView,
  },
  created() {
    EventBus.$on('changeFocus', this.changeFocus);
  },
  data() {
    return {
      selectTargetID: '',
      replyItems: [
        {
          id: 'hoge',
          val: 'ok',
        },
        {
          id: 'fuga',
          val: 'okok',
        },
      ],
    };
  },
  methods: {
    changeFocus(targetId, prevOrNext) {
      switch (prevOrNext) {
        case 'prev':
          break;
        case 'next':
          break;
        default:
        
      }
    },
    prevMessage() {
      console.log('prev');
    },
    nextMessage() {
      console.log('next');
    },
  },
});
</script>