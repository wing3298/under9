import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedMessageId: {id: ''},
  },
  getters: {
    getSelectedId(state): string {
        return state.selectedMessageId.id;
    },
  },
  actions: {
    saveTargetId({commit, state}, targetId) {
        commit('updateSelectId', targetId);
    },
  },
  mutations: {
    updateSelectId(state, targetId) {
        state.selectedMessageId = targetId;
    },
  },
});
