<template>
  <div class="notification replyform">
    <div style="">
      <div style="width: 4px;float: left;">&nbsp;</div>
      <div style="margin-top: 6px; margin-right: 10px; margin-left: 4px; float: left;">
        <img title="You!" class="online" alt="You!" :src="unknown" style="width: 3em; border: 1px solid #c0c0c0;">
      </div>
      <div style="overflow:hidden; padding-top:3px;padding-right: 3px;">
        <div class="message-formatted">
          <form class="add-message" method="post" style="position: relative;">
            <textarea name="message" placeholder="Write a comment..." class="wavereply"></textarea>
            <div style="height: 100%; vertical-align: bottom;">
            <input type="submit" class="button sendmsg" value="Done(Shift+Enter)"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WaveReplyFormView',
  data() {
    return {
      unknown: require('~/assets/unknown.jpg'),
    };
  },
});
</script>

<style lang="scss">

.replyform {
    border-top: 1px solid #EBEBEB;
    border-right: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB;
    border-left: 1px solid #EBEBEB;
    border-radius: 6px;
    border: 3px solid rgb(169, 169, 169);
    border-image: none;
    background-color: #eee;
}

.replyTextArea {
  outline: 0;
  width: 100%;
  min-height: 40px;
  border: none;
  overflow: hidden;
  /* font-size: 1.15em; */
  margin-bottom: 3px;
}

.wavereply {
  border: medium;
  border-image: none;
  width: 100%;
  min-height: 70px;
  background-color: rgb(238, 238, 238);
  outline: 0;
  padding-right: 150px;
  resize: horizontal;
}

.sendmsg {
  position: absolute;
  right: 10px;
  bottom: 5px;
}
</style>
