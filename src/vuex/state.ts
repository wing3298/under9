import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const state = {
    selectedMessageId: false,
};
const actions = {
    saveTargetId(context) {
        const selectId = context.state.selectedMessageId;
        context.commit('updateSelectId', selectId);
    },
};
const getters = {
    getSelectedId() {
        return state.selectedMessageId;
    },
};
const mutations = {
    updateSelectId(selectId) {
        state.selectedMessageId = selectId;
    },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
