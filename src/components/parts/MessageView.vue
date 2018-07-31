<template>
  <div class="message message-frame" id="msg-{{id}}" tabindex="-1">
    <div class="indicator" style="position: absolute; left: 0px; top: 0px; width: 4px; height: 100%;">&nbsp;</div>
    <div style="width: 100%;min-height: 40px; padding-left: 5px;">
      <div style="float: left; margin-left:2px;margin-top: 4px;margin-right: 4px;" class="message-header"></div>
      <div style="overflow:hidden; width:auto;padding-top:3px;padding-right: 3px;padding-left: 5px;">
        <div id="message-indicator" style="height: 26px;">
          <div style="float: left;" class="author">{{ user.name }}:</div>
          <a class="threadIcon nodecoration d-none d-md-inline d-lg-inline d-xl-inline"><img class="grayscale icons" style="vertical-align: top;" src="/images/indexB3.png">Edit</a>
          <a class="mute threadIcon nodecoration" href=""><img class="grayscale icons" style="vertical-align: top;" src="/images/muted.png">Mute</a>
          <a class="icon threadIcon nodecoration" href=""><img class="grayscale icons" style="vertical-align: top;" src="/images/indexB1.png">Icon</a>
          <a class="reply threadIcon nodecoration d-none d-md-inline d-lg-inline d-xl-inline" href=""><img class="grayscale icons" style="vertical-align: top;" src="/images/indexB.png">Reply</a>
          <a  style="float: right;" class="time">{{ dateFormatted }}</a>
          <span class="icon threadIcon thumbsImg mr-0"></span>
        </div>
        <div class="message-formatted">
          {| messageFormatted |}
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="replies replies-hidden">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'MessageView',
  data() {
    return {
      msg: '',
    };
  },
});
</script>