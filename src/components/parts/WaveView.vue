<template>
  <div class="wave">
    <div class="waves-container" id="container">
        <div class="messages">
          <div id="messageHead" class="notification getprevmessages"></div>
          <message-view v-for="message in messages" :key="message.itm" :messages="message.itm"></message-view>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref  } from 'vue';

import MessageView from './MessageView.vue';
import EventBus from '../../libs/EventBus';

export default defineComponent({
  name: 'WaveView',
  template: '#WaveView',
  components: {
    MessageView: MessageView,
  },
  setup() {

      const testdata = [
        {
        itm:{
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
              itm:{
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
            }},
            {itm:{
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
                {itm:{
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
                }},
              ],
            }},
            {itm:{
              msgId: 'msg005',
              message: 'fuga4',
              auther: '',
              icons: {},
              mute: false,
              date: { created: '', modified: ''},
              rootGroup: '1',
              parentId: 'msg001',
              parentIndex: 1,
              haveChild: true,
              replyItems: [
                {itm:{
                  msgId: 'msg007',
                  message: 'fuga7',
                  auther: '',
                  icons: {},
                  mute: false,
                  date: { created: '', modified: ''},
                  rootGroup: '1',
                  parentId: 'msg005',
                  parentIndex: 1,
                  haveChild: false,
                  replyItems: [],
                }},
              ],
            }},
          ],
        }},
        {itm:{
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
          replyItems: [],
        }},
      ];

    const messages = ref(testdata);
    return {
      selectTargetID: '',
      messages,
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
          break;
      }
    },
  },
});
</script>
