<template>
  <div class="wave">
    <div class="waves-container">
        <div class="messages">
          <div id="messageHead" class="notification getprevmessages"></div>
          <MessageView :message-id="selectTargetID" v-for="itm in messageItems" :message-items="messageItems"></MessageView>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MessageView from './MessageView.vue';
import EventBus from '../../libs/EventBus.ts';

export default Vue.component('WaveView', {
  name: 'WaveView',
  template: '#WaveView',
  components: {
    messageView: MessageView,
  },
  created() {
    EventBus.$on('changeFocus', this.changeFocus);
  },
  data() {
    return {
      selectTargetID: '',
      messageItems: [
        {
          msgId: 'msg001',
          message: 'hoge<br>yahoooooo',
          auther: '',
          icons: {},
          mute: false,
          date: { created: '', modified: ''},
          rootGroup: '1',
          parentId: '',
          parentIndex: 1,
          haveChild: true,
          replyItems: [
            {
              msgId: 'msg002',
              message: 'fuga',
              auther: '',
              icons: {},
              mute: false,
              date: { created: '', modified: ''},
              rootGroup: '1',
              parentId: 'msg001',
              parentIndex: 1,
              haveChild: false,
              replyItems: [],
            },
            {
              msgId: 'msg004',
              message: 'fuga2',
              auther: '',
              icons: {},
              mute: false,
              date: { created: '', modified: ''},
              rootGroup: '1',
              parentId: 'msg001',
              parentIndex: 1,
              haveChild: true,
              replyItems: [
                {
                  msgId: 'msg006',
                  message: 'fuga3',
                  auther: '',
                  icons: {},
                  mute: false,
                  date: { created: '', modified: ''},
                  rootGroup: '1',
                  parentId: 'msg001',
                  parentIndex: 1,
                  haveChild: false,
                  replyItems: [],
                },
              ],
            },
            {
              msgId: 'msg005',
              message: 'fuga3',
              auther: '',
              icons: {},
              mute: false,
              date: { created: '', modified: ''},
              rootGroup: '1',
              parentId: 'msg001',
              parentIndex: 1,
              haveChild: false,
              replyItems: [],
            },
          ],
        },
        {
          msgId: 'msg003',
          message: 'hoo',
          auther: '',
          icons: {},
          mute: false,
          date: { created: '', modified: ''},
          rootGroup: '2',
          parentId: '',
          parentIndex: -1,
          haveChild: false,
        },
      ],
    };
  },
  methods: {
    changeFocus(targetId, prevOrNext) {
      switch (prevOrNext) {
        case 'prev':
          break;
        case 'next':
          break;
        default:
        
      }
    },
  },
});
</script>