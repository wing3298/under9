<template>
  <div class="avatar">
      <label>
          <img width="80"><br>
          <input type="radio" value="{{ url }}" name="edituser-avatar-cb" required="required">
      </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditAvatarView',
  data() {
    return {
      url: '',
    };
  },
});
</script>
