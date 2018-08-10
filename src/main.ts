import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Quasar, * as All from 'quasar-framework/dist/quasar.mat.esm.js';
import 'quasar-extras/material-icons';
import stateStore from './vuex/state';

Vue.config.productionTip = false;

declare var require: any;
// tslint:disable-next-line:no-var-requires
require('quasar-framework/dist/umd/quasar.mat.min.css');
// tslint:disable-next-line:no-var-requires
require('quasar-extras/roboto-font');

Vue.use(Quasar, {
  components: All,  // 使いたいコンポーネントのみ列挙でもよいはず
  directives: All,  // こちらも上と同様
});

// #app to index.html>div>id='app'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: stateStore,
  computed: {
    currentMessageId(): string {
      return this.$store.getters.getSelectedId;
    },
  },
});
