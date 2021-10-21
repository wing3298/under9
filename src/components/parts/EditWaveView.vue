<template>
  <div id="editwave" class="overlay">
    <div class="overlay-title">
      <a class="close button R" href="">Close</a>
      <h2 class="R">Add conversation</h2>
    </div>
    <div class="overlay-body">
      <h2 class="R">Add conversation</h2>
      <form method="post">
        <div>
          <label for="editwave-title" class="R">Title</label>
          <div class="right">
            <input id="editwave-title" class="normal" name="title" type="text" required="required">
          </div>
        </div>
        <div>
          <label for="editwave-users" class="R">Participants</label>
          <div class="right">
            <input id="editwave-users" name="userids" class="normal" type="text">
          </div>
        </div>
        <div class="right">
          <button id="editwave-submit" type="submit" class="button R">Create</button>
          <button id="editwave-invite" class="button R">Get invite code</button>
        </div>
        <br style="clear:both">
        <div id="editwave-invitecode-block">
          <label for="editwave-invitecode" class="R">Invite URL</label>
          <div class="right">
            <input id="editwave-invitecode" class="normal" type="text" readonly="readonly" style="width:100%;">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditWaveView',
  data() {
    return {
      msg: '',
    };
  },
});
</script>
