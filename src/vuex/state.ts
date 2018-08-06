import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const state = {
    allunread: '',
};
const actions = {
    allunread(context) {
        let unreadstate = context.state.allunread;
        if (unreadstate === 'selected') {
            unreadstate = '';
        }
        context.commit('updateUnreadState', unreadstate);
    },
};
const getters = {};
const mutations = {
    updateUnreadState(unreadState) {
        state.allunread = unreadState;
    },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
