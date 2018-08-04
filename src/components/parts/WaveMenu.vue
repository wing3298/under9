<template>
  <div class="wavetop">
      <q-btn dense
        color="tertiary"
        size="sm"
        label="Next unread"
      />
      <q-btn dense
        color="tertiary"
        size="sm"
        label="Earlier messages"
      />
      <q-btn dense
        color="tertiary"
        size="sm"
        label="All read"
      />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.component('WaveMenu', {
  template: '#WaveMenu',
});
</script>