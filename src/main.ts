import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
//import RouterSwitcher from './Base.vue';
//import {  } from 'vuex'
import { store } from './vuex/state';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

const templateNode = {
  itm:{
    msgId: '',
    message: '',
    auther: '',
    icons: {},
    mute: false,
    date: { created: '', modified: ''},
    rootGroup: '',
    parentId: '',
    parentIndex: 1,
    haveChild: false,
    replyItems: [],
  }
};


const app = createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .provide('templateNode', templateNode)
  .mount('#app');


