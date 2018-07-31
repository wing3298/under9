<template>
  <div class="avatar">
      <label>
          <img width="80"><br>
          <input type="radio" value="{{ url }}" name="edituser-avatar-cb" required="required">
      </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'EditAvatarView',
  data() {
    return {
      url: '',
    };
  },
});
</script>