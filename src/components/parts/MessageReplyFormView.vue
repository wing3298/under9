<template>
  <div class="notification replyform" style="padding-top: 0px; padding-bottom: 0px;" id="myselfmessage" tabindex="-1">
    <div style="width: 100%;min-height: 40px; padding-left: 5px;">
      <div style=" float: left;margin-left:2px;margin-top: 4px;margin-right: 4px;" class="message-header"></div>
      <div style="overflow:hidden; width:auto;padding-top:3px;padding-right: 3px;padding-left: 5px;">
        <div style="height: 20px;">
          <div style="float: left;" class="author">unknown:</div>
          <a  style="float: right;" class="time">YYYY/MM/DD</a>
        </div>
        <div class="message-formatted">
            <form class="add-message" method="post" style="margin-top: 0px; margin-left: 0px;">
                <textarea name="message" class="replyTextArea pl-0"></textarea>
                <input type="submit" class="button sendmsg" style="right: 10px; position: absolute; float: right; bottom: 10px;" value="Done(Shift+Enter)"/>
            </form>
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.component('MessageReplyFormView', {
  template: '#MessageReplyFormView',
  data() {
    return {
    };
  },
});
</script>