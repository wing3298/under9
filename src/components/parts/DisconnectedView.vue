<template>
  <div id="disconnected" class="overlay">
    <div class="overlay-title">
      <h2 class="R">Disconnected</h2>
    </div>
    <div class="overlay-body">
      <h2 class="R">You're disconnected</h2>
          <p class="countdown"><span class="R">Retrying in:</span> <span class="counter">{{ counter }}</span></p>
          <a href="/" class="R">Reconnect</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DisconnectedView',
  data() {
    return {
      counter: '1',
    };
  },
});
</script>
