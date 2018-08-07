<template>
  <div class="wave">
    <div class="waves-container">
        <div class="messages">
          <div class="notification getprevmessages"></div>
          <MessageView v-on:saveTargetId="saveTargetId" :message-id="selectTargetID"></MessageView>
          <MessageView v-on:saveTargetId="saveTargetId" :message-id="selectTargetID"></MessageView>
          <MessageView v-on:saveTargetId="saveTargetId" :message-id="selectTargetID"></MessageView>
          <MessageView v-on:saveTargetId="saveTargetId" :message-id="selectTargetID"></MessageView>
          <MessageView v-on:saveTargetId="saveTargetId" :message-id="selectTargetID"></MessageView>
          <MessageView v-on:saveTargetId="saveTargetId" :message-id="selectTargetID"></MessageView>
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
      selectTargetID: '',
    };
  },
  methods: {
    // call by children
    saveTargetId(targetId) {
      // all children
      this.$store.dispatch('saveTargetId');
      this.selectTargetID = targetId;
    },
    // add sibling children
    replySiblingMessage(targetId) {

    },
  },
});


const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
    $bus: {
        get() {
            return EventBus;
        },
    },
});

</script>