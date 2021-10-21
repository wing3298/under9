<template>
  <img class="{{ status }}" src="" alt="{{ name }}" title="{{ name }}">
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'UserView',
  data() {
    return {
      msg: '',
    };
  },
});
</script>
