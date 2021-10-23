<template>
  <div :id="id"
    tabindex="-1"
    ref="{{ id }}"
    @click.stop="readMessage"
    @keyup.stop.prevent.shift.enter="addSameMessage"
    @keyup.enter.stop.prevent.exact="addChildMessage"
    @keyup.up.stop="prevMessage"
    @keyup.down.stop="nextMessage"
    @keyup.space.stop="nextMessage"
    @focus="focusIn"
    @blur="focusOut"
    class="message message-frame"
    :class="{ selected: isSelectedMessage }">
    <div class="indicator indicatorspace">&nbsp;</div>
    <div class="message-basebody">
      <div class="message-header">
        <img class="online" :src="unknown" alt="unknown" title="unknown" style="height:44px">
      </div>
      <div class="message-body">
        <message-header-view></message-header-view>
        <div class="message-formatted" @click="setReplyPosition">
          <message-edit-row v-if="messages.message==''"></message-edit-row>
          <message-row v-else v-for="msg in messages.message.split('<br>')" :key="msg.msgId" :post="msg"></message-row>
          <!--<template v-if="messages.haveChild" >-->
            <!--<reply-form :messages="messages.replyItems"></reply-form>-->
          <!--</template>-->
        </div>
      </div>
    </div>
    <div :class="[fixRepliesClass, {repliesHidden : !messages.haveChild}]">
      <!-- Child of same level -->
      <template v-if="messages.haveChild">
        <message-view v-for="message in messages.replyItems" :key="message.itm" :messages="message.itm"></message-view>
      </template>
      <!-- Enter or Shift + Enter Messages　Child of same level -->
      <message-reply-form-view v-if="addReplyFrame" @commitMessage="commitReply" @hideReplyFrom="hideReplyFrom"></message-reply-form-view>
    </div>
    <div class="replyHandle" @click.stop="addReply"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext, toRefs, watch, reactive, watchEffect, ref, InjectionKey, inject} from 'vue';
import Vuex, { CommitOptions, useStore } from 'vuex';
import MessageHeaderView from './MessageHeaderView.vue';
import MessageReplyFormView from './MessageReplyFormView.vue';
import MessageRow from './MessageRow.vue';
import ReplyForm from './ReplyForm.vue';
import MessageSelector from '../../libs/MessageSelector';
import MessageInitialyzer from '../../libs/MessageInitialyzer';
import MessageEditRow from './MessageEditRow.vue';

export default defineComponent({
  name: 'MessageView',
  template: '#MessageView',
  props: {
    messages: {
      type: Object,
      required: true,
    }
  },
  //get global scope variable
  inject: ['templateNode'],
  setup(props, SetupContext){
//    const { messages } = toRefs(props);
//    watch(messages, () => {
      //
//    });

    const store = useStore();
    const id: string = Math.random().toString(36).slice(-8);
    let activeChildMessageId: string = '';
    const unknown: any = require('~/assets/unknown.jpg');
    const fixRepliesClass: string = 'replies';
    let addReplyFrame = ref(false);
    let replyPosition: number =  -1;
    let replyIndex:　Array<number> = [];
    let replyItems: Array<object> = [];
    let currentMessageId: string = id;
    let isSelectedMessage = ref(false);
    let messageTemplate: JSON = inject('templateNode') as JSON;


    //指定のオブジェクトが変更されるたびに実行
    store.watch((state, getters) => getters.getSelectedId, (newValue, oldValue) => {
      console.log('watch');
    });

    //指定したオブジェクトの変更が行われた後に実行
    store.subscribe((mutation, state) => {
      if (mutation.type === 'updateSelectId') {
        console.log('subscribe');
        isSelectedMessage.value = (computed(()=>{
          //各自自分のIDと異なる場合はメッセージの選択フレームを消す、自分自身だけ色をつける
          return store.getters.getSelectedId == currentMessageId
        })).value;
      }
    });
/*
    //コンポーネント全体のReactiveな変更を監視
    watchEffect(() => {
      //isSelectedMessage.valueが変更されると呼び出される
      isSelectedMessage.value = (computed(()=>{
        //各自自分のIDと異なる場合はメッセージの選択フレームを消す、自分自身だけ色をつける
        return store.getters.getSelectedId == currentMessageId
      })).value;
    });
*/
    /**
     * NodeのクリックでIDをグローバルに保存
     * フォーカス枠をつける、他の全てからフォーカスを消す、他のクライアントは関係しない
     */
    const readMessage = (event): void => {
      if (event) {
        //メッセージIDをActiveに変更(他のメッセージコンポーネントに通知するため)
        currentMessageId = event.currentTarget.id;
        // call to state -> other all unselect
        //Vuexのstoreに自分のメッセージIDを登録
        store.dispatch('saveTargetId', event.currentTarget.id);

        //Server:自分の既読をコミットする

      }
    };
    // reply frame click(At this point is uncertain)
    const addReply = (event): void => {
      if (event) {
        //Enterで子階層にNodeが追加されるためいなければプロパティ変更
        //TODO: このプロパティは廃止する
        props.messages.haveChild = true;
        //テンプレートからメッセージのHTMLを取得
        const childItems: Array<JSON> = props.messages.replyItems;
        //保持しているデータにテンプレートを整えて追加する
        childItems.push(MessageInitialyzer.init(messageTemplate));
        //画面はリアクティブに追従
      }
    };
    // Enter key event and ...
    const addChildMessage = (event): void => {
      // shiftキーも拾ってしまうのでこのメソッドでは排除(子から呼ばれたとき)
      if (!event.shiftKey) {
        // Enter key -> add reply frame(child)
        addReply(event);
      }
    };
    // Shift + Enter key event
    const addSameMessage = (event): void => {
      if (event) {
        // call to parent method -> add same(sibling) child
        //this.$emit('replySiblingMessage', this.id);
      }
    };
    // 子コンポーネントから呼び出し
    const addSameReplyMessage = (targetId): void => {
      addReply({});
    };
    // from child event 入力フォームを消す
    //MessageReplyFormView.vueからemitで呼び出される
    const hideReplyFrom = (event, targetId): void => {
      console.log(targetId);
      //入力フォームを消す
      addReplyFrame.value = false;
      //TODO: 入力されたフォームを実フォームと入れ替える
      //入力確定まではキャンセルされる可能性があるのでデータは確定させない？
      //データを強制的に追加することでリアクティブに画面を表示させる？
      //文字なしなら入力できるようにする？

      // 自分にフォーカスする
      //(this.$refs.messageView as HTMLElement).focus();
    };
    // from child event 入力フォームからShift + Enterで確定
    const commitReply = (event, targetId: string, inputText): void => {
      // 入力フォームを消す
      addReplyFrame.value = false;
      // データを追加
      replyItems.push({ targetId : inputText });
    };
    const setReplyPosition = (event): void => {
      // const target: any[] = event.currentTarget.childNodes;
      //console.log(event.target);
      // console.log(target.indexOf(event.target));
    };
    const focusIn = (event): void => {
      //console.log('focusIn');
      activeChildMessageId = event.currentTarget.id;
    };
    const focusOut = (event): void => {
      activeChildMessageId = '';
    };

    const prevMessage = (event): void => {
      focusInPrevNode(event.currentTarget);
    };
    //ClickされたNodeの兄弟の一つ前を選択させる
    const focusInPrevNode = (targetNode): void => {
      //イベント発生Nodeの兄弟の一つ前を取得
      const targetEl: HTMLScriptElement = targetNode.previousElementSibling as HTMLScriptElement;
      //more top node
      if(targetEl != null && targetEl.id == 'messageHead'){
        console.log('more top node');
        return
      }
      //兄弟がいる場合はそこに移動
      if (targetEl !== null) {
        targetEl.focus();
        store.dispatch('saveTargetId', targetEl.id);
      }
      //child top node
      else {
        //ひとつ前の兄弟がいない場合は親に移動する
        const targetParentNodeId = MessageSelector.prevId(targetNode);
        MessageSelector.parentNode(targetNode).focus();
        store.dispatch('saveTargetId', targetParentNodeId);
      }
    };

    const nextMessage = (event): void => {
      focusInNextNode(event.currentTarget);
    };
    const focusInNextNode = (targetNode): void => {
      const targetEl: HTMLScriptElement = targetNode.nextElementSibling as HTMLScriptElement;
      if (targetEl !== null) {
        targetEl.focus();
        console.log(targetEl.id);
        //子がいれば子を優先する

        store.dispatch('saveTargetId', targetEl.id);
      }
      else {
        //対象がないので親に戻す
        console.log(targetNode.parentNode.parentNode);
        //more bottom node
        if(targetNode.parentNode.parentNode.id == 'container'){
          return;
        }
        focusInNextNode(targetNode.parentNode.parentNode);
      }
    };
    const formatMessage = (source: string): string => {
      const lines = source.split('<br>');
      const formatText: string[] = [];
      lines.forEach(element => {
        formatText.push('<div class="msgrow">' + element + '</div>');
      });
      return formatText.join('');
    };


    const isReplies = {
      repliesHidden: addReplyFrame &&　replyItems.length === 0
    };
    const hasReplyFrame = (): boolean => {
      return addReplyFrame.value;
    };

    return{
      id,
      currentMessageId,
      focusIn,
      focusOut,
      props,
      unknown,
      fixRepliesClass,
      addReplyFrame,
      isReplies,
      isSelectedMessage,
      readMessage,
      prevMessage,
      nextMessage,
      focusInPrevNode,
      focusInNextNode,
      setReplyPosition,
      addChildMessage,
      addReply,
      commitReply,
      hideReplyFrom,
      addSameMessage,
    };

  },
  components: {
    MessageHeaderView: MessageHeaderView,
    MessageReplyFormView: MessageReplyFormView,
    MessageRow: MessageRow,
    MessageEditRow: MessageEditRow,
    //ReplyForm: ReplyForm,
  },
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
