<template>
    <div :class="[fixRepliesClass, isReplies]" ref="replyForm">
      <!-- Child of same level -->
      <MessageView v-if="replyItems.length > 0" v-for="item in replyItems" :key="item.id"
        @replySiblingMessage="addSameReplyMessage"
        @prevParentMessage="focusInPrevNode"
        @nextParentMessage="focusInNextNode"
        ></MessageView>
      <!-- Enter or Shift + Enter Messages　Child of same level -->
      <MessageReplyFormView v-if="addReplyFrame" @commitMessage="commitReply" @hideReplyFrom="hideReplyFrom"></MessageReplyFormView>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex, { CommitOptions } from 'vuex';
import MessageReplyFormView from './MessageReplyFormView.vue';
import EventBus from '../../libs/EventBus';

export default Vue.component('ReplyForm', {
  template: '#ReplyForm',
  data() {
    return {
      id: Math.random().toString(36).slice(-8),
      activeChildMessageId: '',
      fixRepliesClass: 'replies',
      addReplyFrame: false,
      replyPosition: -1,
      replyIndex: [] as object[],
      replyItems: [] as object[],
    };
  },
  components: {
    messageReplyFormView: MessageReplyFormView,
  },
  created() {
    // const initdata = { msgId: '', message: '', auther: '', icons: {}, mute: false, date: ''};
    // this.replyItems.push(initdata);
  },
  methods: {
    // from child event 入力フォームを消す
    hideReplyFrom(event, targetId) {
      this.addReplyFrame = false;
      // 自分にフォーカスする
      (this.$refs.replyForm as HTMLElement).focus();
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
      'replyMessage',
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

//.thumbsImg {
//}

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


//.reply {
//}

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
