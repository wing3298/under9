<template>
  <div class="wavetop">
      <q-btn dense
        color="tertiary"
        size="sm"
        label="Wave Edit"
      />
      <q-btn dense
        color="tertiary"
        size="sm"
        label="Leave conversation"
      />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.component('WaveSettings', {
  template: '#WaveSettings',
});
</script>