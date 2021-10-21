import { createStore } from 'vuex'

export const store = createStore({
  state: {
    selectedMessageId: '',
  },
  getters: {
    //call coumputed(()=>store.getters.getSelectedId)
    getSelectedId(state: any): string {
        return state.selectedMessageId;
    },
  },
  //アクションは、状態を変更するのではなく、ミューテーションをコミットします
  //アクションは store.dispatch がトリガーとなって実行されます
  actions: {
    //call store.dispatch("saveTargetId")
    saveTargetId({ commit }, targetId: string) {
        commit('updateSelectId', targetId);
    },
  },
  //ミューテーションハンドラを起動するためにはミューテーションのタイプを指定して store.commit を呼び出す必要があります
  mutations: {
    //call store.commit("updateSelectId")
    updateSelectId(state: any, targetId: string) {
      state.selectedMessageId = targetId;
    },
  },
});
