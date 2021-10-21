<template>
  <a href="{{ url }}" target="_blank">
      <b>{{ title }}</b><br>
      <img src="{{ image }}" style="max-width: 300px;max-height: 200px;"><br>
      <span>{{ description }}</span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MessageLinkPreviewView',
  data() {
    return {
      msg: '',
    };
  },
});
</script>
