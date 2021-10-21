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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WaveSettings',
  template: '#WaveSettings',
});
</script>
