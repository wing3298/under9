<template>
  <div id="edituser" class="overlay">
    <div class="overlay-title">
      <a class="close button R" href="">Close</a>
      <h2 class="R">Edit profile</h2>
    </div>
    <div class="overlay-body">
      <h2 class="R">Edit profile</h2>
      <form method="post">
        <div class="edituser-name-row">
          <label for="edituser-name" class="R">Name</label>
          <div class="right">
            <input id="edituser-name" class="normal" name="name" type="text" maxlength="30" required="required">
          </div>
        </div>
        <div class="ediutuser-avatar-row">
          <label for="edituser-avatar-cb" class="R">Avatar</label>
          <div class="right">
          </div>
        </div>
        <div class="edituser-notification-row">
            <label class="R">Notifications</label>
            <div class="right">
                <span id="edituser-notification-status"></span>
                <button type="button" id="edituser-notification-test" class="R">Test</button>
            </div>
        </div>
        <div class="edituser-localsettings-row">
            <label class="R">Local settings</label>
            <div class="right">
                <label><input type="checkbox" id="edituser-show-pictures">Show pictures</label><br style="clear: both">
                <label><input type="checkbox" id="edituser-show-videos">Show videos</label><br style="clear: both">
                <label><input type="checkbox" id="edituser-show-linkpreviews">Show link previews</label>
            </div>
        </div>
        <div class="right">
          <button id="edituser-submit" type="submit" class="button R">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'EditUserView',
  data() {
    return {
      msg: '',
    };
  },
});
</script>