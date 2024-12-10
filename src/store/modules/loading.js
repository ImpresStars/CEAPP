export default {
  namespaced: true,

  state: () => ({
    isLoading: false,
    loadingMessage: '',
    loadingStack: []
  }),

  mutations: {
    PUSH_LOADING(state, message = 'Loading...') {
      state.loadingStack.push(message)
      state.isLoading = true
      state.loadingMessage = message
    },
    POP_LOADING(state) {
      state.loadingStack.pop()
      if (state.loadingStack.length > 0) {
        state.loadingMessage = state.loadingStack[state.loadingStack.length - 1]
      } else {
        state.isLoading = false
        state.loadingMessage = ''
      }
    },
    CLEAR_LOADING(state) {
      state.loadingStack = []
      state.isLoading = false
      state.loadingMessage = ''
    }
  },

  actions: {
    startLoading({ commit }, message) {
      commit('PUSH_LOADING', message)
    },
    stopLoading({ commit }) {
      commit('POP_LOADING')
    },
    clearLoading({ commit }) {
      commit('CLEAR_LOADING')
    }
  },

  getters: {
    isLoading: state => state.isLoading,
    loadingMessage: state => state.loadingMessage,
    loadingDepth: state => state.loadingStack.length
  }
}