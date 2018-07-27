<template>
  <div id="app">
    <img :src="require('./assets/logo.png')">
    <router-view/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      logoimg: './assets/logo.png',
    };
  },
};
</script>