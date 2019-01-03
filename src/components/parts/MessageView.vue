<template>
  <div :id="this.id"
    tabindex="-1"
    ref="messageView"
    @click.stop="readMessage"
    @keyup.stop.prevent.shift.enter="addSameMessage"
    @keyup.enter.stop.prevent="addChildMessage"
    @keyup.up.stop="prevMessage"
    @keyup.down.stop="nextMessage"
    @keyup.space.stop="nextMessage"
    @focus="focusIn"
    @blur="focusOut"
    :class="[fixMessageClass, fixMessageFrameClass, unselectMessage]">
    <div class="indicator indicatorspace">&nbsp;</div>
    <div class="message-basebody">
      <div class="message-header">
        <img class="online" :src="unknown" alt="unknown" title="unknown" style="height:44px">
      </div>
      <div class="message-body">
        <MessageHeaderView></MessageHeaderView>
        <div class="message-formatted" @click="setReplyPosition">
          {{ formatMessage(messageItems[0].message) }}
          <ReplyForm v-if="messageItems[0].haveChild"></ReplyForm>
        </div>
      </div>
    </div>
    <div :class="[fixRepliesClass, isReplies]">
      <!-- Child of same level -->
      <MessageView v-if="replyItems.length > 0" v-for="item in replyItems" :key="item.id"
        @replySiblingMessage="addSameReplyMessage"
        @prevParentMessage="focusInPrevNode"
        @nextParentMessage="focusInNextNode"
        ></MessageView>
      <!-- Enter or Shift + Enter Messages　Child of same level -->
      <MessageReplyFormView v-if="addReplyFrame" @commitMessage="commitReply" @hideReplyFrom="hideReplyFrom"></MessageReplyFormView>
    </div>
    <div class="replyHandle" @click.stop="addReply"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex, { CommitOptions } from 'vuex';
import MessageHeaderView from './MessageHeaderView.vue';
import MessageReplyFormView from './MessageReplyFormView.vue';
import ReplyForm from './ReplyForm.vue';
import EventBus from '../../libs/EventBus.ts';

export default Vue.component('MessageView', {
  template: '#MessageView',
  data() {
    return {
      id: Math.random().toString(36).slice(-8),
      activeChildMessageId: '',
      unknown: require('../../assets/messages/unknown.jpg'),
      fixMessageClass: 'message',
      fixMessageFrameClass: 'message-frame',
      fixRepliesClass: 'replies',
      addReplyFrame: false,
      replyPosition: -1,
      replyIndex: [] as object[],
      replyItems: [] as object[],
    };
  },
  components: {
    messageHeaderView: MessageHeaderView,
    messageReplyFormView: MessageReplyFormView,
    replyForm: ReplyForm,
  },
  created() {
    // tslint:disable-next-line:max-line-length
    // const initdata = { msgId: '', message: '', auther: '', icons: {}, mute: false, date: { created: '', modified: ''}, rootGroup: '', parentId: '', parentIndex: 1 };
    // this.replyItems.push(initdata);
  },
  methods: {
    // mouse click
    readMessage(event) {
      if (event) {
        // call to state -> other all unselect
        this.$store.dispatch('saveTargetId', {id: event.currentTarget.id});
      }
    },
    // reply frame click(At this point is uncertain)
    addReply(event) {
      if (event) {
        this.addReplyFrame = true;
      }
    },
    // Enter key event and ...
    addChildMessage(event) {
      // shiftキーも拾ってしまうのでこのメソッドでは排除(子から呼ばれたとき)
      if (!event.shiftKey) {
        // Enter key -> add reply frame(child)
        this.addReply(event);
      }
    },
    // Shift + Enter key event
    addSameMessage(event) {
      if (event) {
        // call to parent method -> add same(sibling) child
        this.$emit('replySiblingMessage', this.id);
      }
    },
    // 子コンポーネントから呼び出し
    addSameReplyMessage(targetId) {
      this.addReply({});
    },
    // from child event 入力フォームを消す
    hideReplyFrom(event, targetId) {
      this.addReplyFrame = false;
      // 自分にフォーカスする
      (this.$refs.messageView as HTMLElement).focus();
    },
    // from child event 入力フォームからShift + Enterで確定
    commitReply(event, targetId, inputText) {
      // 入力フォームを消す
      this.addReplyFrame = false;
      // データを追加
      this.replyItems.push({ targetId : inputText });
    },
    setReplyPosition(event) {
      // const target: any[] = event.currentTarget.childNodes;
      console.log(event.target);
      // console.log(target.indexOf(event.target));
    },
    focusIn(event) {
      console.log('focusIn');
      this.activeChildMessageId = event.currentTarget.id;
    },
    focusOut(event) {
      this.activeChildMessageId = '';
    },
    prevMessage(event) {
      console.log(event.currentTarget);
      this.focusInPrevNode(event.currentTarget);
    },
    focusInPrevNode(targetNode) {
      const targetEl = targetNode.previousElementSibling as HTMLScriptElement;
      if (targetEl.id !== 'messageHead') {
        return;
      }
      if (targetEl !== null) {
        targetEl.focus();
        this.$store.dispatch('saveTargetId', {id: targetEl.id});
      } else {
        this.$emit('prevParentMessage', targetNode.parentNode.parentNode);
      }
    },
    nextMessage(event) {
      console.log(event.currentTarget);
      this.focusInNextNode(event.currentTarget);
    },
    focusInNextNode(targetNode) {
      const targetEl = targetNode.nextElementSibling as HTMLScriptElement;
      if (targetEl !== null) {
        targetEl.focus();
        this.$store.dispatch('saveTargetId', {id: targetEl.id});
      } else {
        console.log(targetNode.parentNode.parentNode);
        this.$emit('nextParentMessage', targetNode.parentNode.parentNode);
      }
    },
    formatMessage(source: string) {
      const lines = source.split('<br>');
      const formatText: string[] = [];
      lines.forEach(element => {
        formatText.push('<div class="msgrow">' + element + '</div>');
      });
      return formatText.join('');
    },
  },
  computed: {
    unselectMessage(): object {
      return {
        // 選択されたメッセージIDが自分以外の時は選択を消す
        selected: (this.currentMessageId !== '' && this.currentMessageId === this.id),
      };
    },
    isReplies(): object {
      return {
        repliesHidden: !this.addReplyFrame && this.replyItems.length === 0,
      };
    },
    hasReplyFrame(): boolean {
      return this.addReplyFrame;
    },
    currentMessageId(): string {
      return this.$store.getters.getSelectedId;
    },
  },
  props: [
      'messageId',
      'messageItems',
  ],
});
</script>

<style lang="scss">
/* hide forcus rect */
*:focus {
  outline: none;
}

/* wave messages */
.messages {
  border-left: 1px solid #e6e6fa;
  border-top: 1px solid #e6e6fa;
  border-right: 1px solid #e6e6fa;
  border-bottom: 1px solid #e6e6fa;
  background: white;
  margin-top: 3px;/* !check! */
}

.message-formatted {
  font-size: 1em;/* or 1.1em */
}

.message-mute {
  color: #dcdcdc;
}

.selected {
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  box-shadow: 0px 0px 0px 3px #acb975 inset;
}
.message .unread {
  background-color: #acb976;
}

.message table {
  border-collapse: collapse;
  vertical-align: top;
}

.indicatorspace {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 4px;
  height: 100%;
}


.replies{
  position: relative;
  margin-left: 1.8em;
  margin-top: 2em;
  margin-bottom: 0.5em;
  box-shadow: -2px 2px 2px #ddd;
  border:1px solid #D8D8D8;
  border-radius:3px;
  -webkit-border-radius:3px;
  -moz-border-radius:3px;
}
.replies:after,.replies:before{
    border: solid transparent;
    content:'';
    height:0;
    width:0;
    pointer-events:none;
    position:absolute;
    bottom:100%;
    left:4%;
}
.replies:after{
    border-color: rgba(255, 255, 255, 0);
    border-top-width:10px;
    border-bottom-width:10px;
    border-left-width:10px;
    border-right-width:10px;
    margin-left: -10px;
    border-bottom-color:#FFFFFF;
}
.replies:before{
    border-color: rgba(216, 216, 216, 0);
    border-top-width:11px;
    border-bottom-width:11px;
    border-left-width:11px;
    border-right-width:11px;
    margin-left: -11px;
    margin-bottom: 1px;
    border-bottom-color:#D8D8D8;
}



.message-frame {
    padding-top: 4px;
    padding-bottom: 0px;
    border-bottom: 1px dotted #A2A2A2;
    position: relative;
}

.message-frame:first-child {
    /* border-top: 1px solid #A2A2A2; */
    border-bottom: 1px dotted #A2A2A2;
    margin-top: -3px;
    padding-bottom: 0px;
}

.message-frame:last-child {
    padding-top: 3px;
    padding-bottom: 0px;
    /* border-bottom: 1px solid #A2A2A2; */
}

.message-frame:only-of-type {
    margin-top: -3px;
    padding-bottom: 0px;
    border-bottom: 1px solid #EBEBEB;
}

.message-basebody {
  width: 100%;
  min-height: 40px;
  padding-left: 5px;
}

.message-header {
  float: left;
  margin-left:2px;
  margin-top: 4px;
  margin-right: 4px;
}

.message-body {
  overflow: hidden;
  width: auto;
  padding-top: 3px;
  padding-right: 3px;
  padding-left: 5px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
}
.message-body * {
  -webkit-user-select: auto;
  -moz-user-select: auto;
  -khtml-user-select: auto;
  -ms-user-select: auto;
}

.thumbsImg {
}

.iconCount {
  font-size: 7pt;
  vertical-align: bottom;
}


.message-text {
  line-height: 1.5em;
  word-break: break-all;
}

.msgrow {
  line-height: 1.4em;
  user-select: text;
}


.reply {
}

.replyParentTopPosition {
  margin-left: 0px;
}

.time {
  float: right;
  color: #999;
  margin-right: 1em;
  margin-left: 1em;
}

.notification .time {
  color: #aaa;
  margin-right: 2.5em;
}



/* reply */
.repliesHidden {
  display: none;
}



.replyHandle :last-child {
  height: 4px;
  cursor: pointer;
}
.replyHandle:hover {
  border-radius: 1px;
  -webkit-border-radius: 1px;
  -moz-border-radius: 1px;
  box-shadow: 0px 0px 0px 1px #acb975 inset;
}
</style>
