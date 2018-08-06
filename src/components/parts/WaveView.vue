<template>
  <div class="wave">
    <div class="waves-container">
        <div class="messages">
          <div class="notification getprevmessages"></div>
          <MessageView v-on:allUnselect="allUnselect"></MessageView>
          <MessageView v-on:allUnselect="allUnselect"></MessageView>
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
  data() {
    return {
    };
  },
  methods: {
    // call by children
    allUnselect(target) {
      // all children
      this.$store.dispatch('allunread');
    },
  },
});
</script>