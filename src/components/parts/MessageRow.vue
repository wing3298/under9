<template>
    <div>{{ post }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Vuex, { CommitOptions } from 'vuex';

export default defineComponent({
  name: 'MessageRow',
  template: '#MessageRow',
  props: ['post'],
  data() {
    return {
    };
  },
});
</script>

<style lang="scss">
</style>
