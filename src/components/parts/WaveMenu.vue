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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WaveMenu',
  template: '#WaveMenu',
  setup() {
    return{};
  }
});
</script>

<style lang="scss">
.wavetop {
  text-align: right;
}
</style>
