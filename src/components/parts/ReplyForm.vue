<template>
    <div :class="[fixRepliesClass, isReplies]" ref="messages">
      <!-- Child of same level -->
        <message-view v-for="message in messages" :key="message.itm" :messages="message.itm"
          @replySiblingMessage="addSameReplyMessage"
          @prevParentMessage="focusInPrevNode"
          @nextParentMessage="focusInNextNode"
          ></message-view>
      <!-- Enter or Shift + Enter Messages　Child of same level -->
      <message-reply-form-view v-if="addReplyFrame" @commitMessage="commitReply" @hideReplyFrom="hideReplyFrom"></message-reply-form-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, toRefs, watch } from 'vue';
import Vuex, { CommitOptions } from 'vuex';
import MessageView from './MessageView.vue';
import MessageReplyFormView from './MessageReplyFormView.vue';
import EventBus from '../../libs/EventBus';

export default defineComponent({
  name: 'ReplyForm',
  template: '#ReplyForm',
  props: {
    messages: {
      type: Object
    }
  },
  setup(props, SetupContext){
    const { messages } = toRefs(props);
    watch(messages, () => {
      //
    });

    var id: Math["random"];//().toString(36).slice(-8);
    let activeChildMessageId: '';
    let fixRepliesClass: 'replies';
    let addReplyFrame: boolean = false;
    let replyPosition: -1;
    let replyIndex: [];
    let replyItems: [];

// from child event 入力フォームを消す
    const hideReplyFrom = (event, targetId): void => {
      addReplyFrame = false;
      // 自分にフォーカスする
      //(this.$refs.replyForm as HTMLElement).focus();
    };
    // from child event 入力フォームからShift + Enterで確定
    const commitReply = (event, targetId: string, inputText): void => {
      // 入力フォームを消す
      addReplyFrame = false;
      // データを追加
      //replyItems.push({ targetId : inputText });
    };
    const setReplyPosition = (event): void => {
      // const target: any[] = event.currentTarget.childNodes;
      //console.log(event.target);
      // console.log(target.indexOf(event.target));
    };

    const unselectMessage = (): object => {
      return {
        // 選択されたメッセージIDが自分以外の時は選択を消す
        selected: (currentMessageId() !== '' && currentMessageId() === id.toString()),
      };
    };
    const isReplies = (): object => {
      return {
        repliesHidden: !addReplyFrame && replyItems.length === 0,
      };
    };
    const hasReplyFrame = (): boolean => {
      return addReplyFrame;
    };
    const currentMessageId = (): string => {
      return '';//this.$store.getters.getSelectedId;
    };

    return {
      props,
      unselectMessage,
      isReplies,
      hasReplyFrame,
      currentMessageId,
    }
  },
  components: {
//    MessageView: MessageView,
    MessageReplyFormView: MessageReplyFormView,
  },
});
</script>
