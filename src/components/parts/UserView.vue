<template>
  <img class="{{ status }}" src="" alt="{{ name }}" title="{{ name }}">
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'UserView',
  data() {
    return {
      msg: '',
    };
  },
});
</script>