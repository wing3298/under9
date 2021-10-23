import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
//import RouterSwitcher from './Base.vue';
import {  } from 'vuex'
import { store } from './vuex/state'

import { initializeApp } from 'firebase/app';
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
//Vue.config.productionTip = false;

declare var require: any;



const config = {
    apiKey: 'AIzaSyDr67D71gKv64_5XJX20VKRFkzpphoN2jw',
    authDomain: 'uneri.firebaseapp.com',
    databaseURL: 'https://uneri.firebaseio.com',
    projectId: 'uneri',
    storageBucket: 'uneri.appspot.com',
    messagingSenderId: '460599917014',
};
initializeApp(config);

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


const app = createApp(App).use(Quasar, quasarUserOptions);
app.provide('templateNode', templateNode);
app.use(store).mount('#app');
/*
router.isReady().then(() => {
  app.mount('#app');
});
*/
