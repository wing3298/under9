<template>
</template>

<script lang="ts">
import Vue from 'vue';
import WaveListView from '../components/parts/WaveListView.vue';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      msg: '',
    };
  },
  components: { WaveListView },
});
</script>