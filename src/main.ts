import Vue from 'vue';
import router from './router';
import RouterSwitcher from './Base.vue';
import Quasar, * as All from 'quasar-framework/dist/quasar.mat.esm.js';
import 'quasar-extras/material-icons';
import stateStore from './vuex/state';
import firebase from 'firebase';

Vue.config.productionTip = false;

declare var require: any;
// tslint:disable-next-line:no-var-requires
require('quasar-framework/dist/umd/quasar.mat.min.css');
// tslint:disable-next-line:no-var-requires
require('quasar-extras/roboto-font');


const config = {
    apiKey: 'AIzaSyDr67D71gKv64_5XJX20VKRFkzpphoN2jw',
    authDomain: 'na-meeting.firebaseapp.com',
    databaseURL: 'https://na-meeting.firebaseio.com',
    projectId: 'na-meeting',
    storageBucket: 'na-meeting.appspot.com',
    messagingSenderId: '460599917014',
};
firebase.initializeApp(config);

Vue.use(Quasar, {
  components: All,  // 使いたいコンポーネントのみ列挙でもよいはず
  directives: All,  // こちらも上と同様
});

// #app to index.html>div>id='app'
new Vue({
  el: '#app',
  router,
  render: h => h(RouterSwitcher),
  store: stateStore,
  computed: {
    currentMessageId(): string {
      return this.$store.getters.getSelectedId;
    },
  },
});
