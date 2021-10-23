<template>
  <div :id="id" class="notification" tabindex="-1" v-on:keyup.esc.stop="escape" v-on:blur.stop="escape" >
    <div style="width: 100%;min-height: 40px; padding-left: 5px;">
      <div class="message-header"></div>
      <div style="overflow:hidden; width:auto;padding-top:3px;padding-right: 3px;padding-left: 5px;">
        <div style="height: 20px;">
          <div style="float: left;" class="author">unknown:</div>
          <a style="float: right;" class="time">YYYY/MM/DD</a>
        </div>
        <div class="message-formatted">
            <form class="add-message" method="post" style="margin-top: 0px; margin-left: 0px;">
                <textarea name="message" class="replyTextArea" v-model="inputText" v-on:keyup.shift.enter.stop="commitMessage" v-on:input="onInput" ref="textarea"></textarea>
                <input type="submit" class="button sendmsg" style="right: 10px; position: absolute; float: right; bottom: 10px;" value="Done(Shift+Enter)" :disabled="processing" @click.prevent="submit"/>
            </form>
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext, toRefs, watch, reactive, watchEffect, ref } from 'vue';
//import { onMounted, onUpdated, onUnmounted } from "@vue/composition-api";

export default defineComponent({
  name: 'MessageReplyFormView',
  template: '#MessageReplyFormView',
  emits: ['hideReplyFrom'],
  setup(props, context) {
    const id: string = Math.random().toString(36).slice(-8);
    const inputText = '';
    const processing = false;
    const unknown: any = require('~/assets/unknown.jpg');


    const replySelect = (event) => {
      if (event) {
      //call to parent method -> other all unselect
      //this.$emit('saveTargetId', event.currentTarget.id);
      }
    };

    const escape = (event) => {
      //const txtArea = this.$refs.textarea as HTMLInputElement;
      //if (txtArea.value.length > 0) {
      //  return false;
      //}
      console.log('escape--'+event.currentTarget);
      context.emit('hideReplyFrom', event.currentTarget.id);
    };

    // 入力中のデータをmodelに入れる
    const onInput = (event) => {
      //this.$emit('input', event.target.value);
    };

    // Shift + Enterでmodelのデータを親に送信
    const commitMessage = (event) => {
      //this.$emit('commitMessage', event.currentTarget.id, this.inputText);
    };
    const submit = () => {
      //if (this.processing) {
      //  return;
      //}
      //this.processing = true;
      //this.doSomething()
      //  .then(() => {
      //    this.processing = false;
      //  });
    };

    const doSomething = () => {
      return new Promise((resolve) => {
      //  setTimeout(() => {
      //    resolve();
      //  }, 1000);
      });
    };
//    onMounted(() => {
      //const txtArea = this.$refs.textarea as HTMLInputElement;
      //txtArea.focus();
//    });

    return {
      id,
      inputText,
      processing,
      replySelect,
      escape,
      onInput,
      commitMessage,
      submit,
      doSomething,
      unknown,
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
}
</style>
