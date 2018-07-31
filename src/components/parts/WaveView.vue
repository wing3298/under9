<template>
  <div class="wave">
    <div class="wavetop fixed-top">
      <span class="wave-title"></span>
      <span class="buttons float-right">
          <a class="btn-sm btn btn-secondary gounread d-sm-inline" href="#">Next unread</a>
          <a class="btn-sm btn btn-secondary getprevmessages d-none d-sm-inline" href="#">Earlier messages</a>
          <a class="btn-sm btn btn-secondary readall d-none d-sm-inline" href="#">All read</a>
          <a class="btn-sm btn btn-info editwave d-none d-sm-inline" href="#">Edit</a>
          <a class="btn-sm btn btn-danger quit d-none d-sm-inline" href="#">Leave conversation</a>
      </span>
    </div>

    <div class="waves-container">
        <div class="messages">
          <div class="notification getprevmessages"></div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.component('WaveView', {
  template: '#WaveView',
});
</script>