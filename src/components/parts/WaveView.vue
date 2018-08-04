<template>
  <div class="wave">
    <div class="waves-container">
        <div class="messages">
          <div class="notification getprevmessages"></div>
          <MessageView></MessageView>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MessageView from './MessageView.vue';

export default Vue.component('WaveView', {
  name: 'WaveView',
  template: '#WaveView',
  components: {
    messageView: MessageView,
  },
});
</script>