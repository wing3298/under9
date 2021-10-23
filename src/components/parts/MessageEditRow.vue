<template>
  <form class="add-message" method="post" style="margin-top: 0px; margin-left: 0px;">
      <textarea name="message" class="replyTextArea" v-model="inputText" v-on:keyup.shift.enter.stop="commitMessage" v-on:input="onInput" ref="textarea" @keyup.enter.stop.prevent.exact="()=>{return false;}"></textarea>
      <input type="submit" class="button sendmsg" style="right: 10px; position: absolute; float: right; bottom: 10px;" value="Done(Shift+Enter)" :disabled="processing" @click.prevent="submit"/>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Vuex, { CommitOptions } from 'vuex';

export default defineComponent({
  name: 'MessageEditRow',
  template: '#MessageRow',
  props: ['post'],
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
      //const txtArea = context.$refs.textarea as HTMLInputElement;
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
