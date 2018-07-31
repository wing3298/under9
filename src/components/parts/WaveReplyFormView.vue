<template>
  <div class="notification replyform d-none d-md-block" style="border-radius: 8px; border: 3px solid rgb(169, 169, 169); border-image: none;">
    <div style="width: 100%;">
      <div style="width: 4px;float: left;">&nbsp;</div>
      <div style="margin-top: 6px; margin-right: 10px; margin-left: 4px; float: left;">
        <img title="You!" class="online" alt="You!" src="/images/unknown.jpg" style="width: 4em; border: 1px solid #c0c0c0;">
      </div>
      <div style="overflow:hidden; padding-top:3px;padding-right: 3px;">
        <div class="message-formatted">
          <form class="add-message" method="post" style="position: relative;">
            <textarea name="message" placeholder="Write a comment..." class="wavereply"></textarea>
            <input type="submit" class="button sendmsg" style="right: 20px; position: absolute; float: right; bottom: 10px;" value="Done(Shift+Enter)"/>
          </form>
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'WaveReplayFormVIew',
  data() {
    return {
      msg: '',
    };
  },
});
</script>