export default {
  namespaced: true,

  state: () => ({
    errors: [],
    globalError: null
  }),

  mutations: {
    ADD_ERROR(state, error) {
      state.errors.push({
        id: Date.now(),
        error,
        timestamp: new Date().toISOString()
      })
    },
    SET_GLOBAL_ERROR(state, error) {
      state.globalError = error
    },
    CLEAR_ERRORS(state) {
      state.errors = []
      state.globalError = null
    },
    REMOVE_ERROR(state, errorId) {
      state.errors = state.errors.filter(e => e.id !== errorId)
    }
  },

  actions: {
    handleError({ commit }, error) {
      if (error.code === 'UNAUTHORIZED') {
        // Handle authentication errors globally
        commit('SET_GLOBAL_ERROR', error)
        return
      }

      commit('ADD_ERROR', error)
    },

    clearErrors({ commit }) {
      commit('CLEAR_ERRORS')
    },

    removeError({ commit }, errorId) {
      commit('REMOVE_ERROR', errorId)
    }
  },

  getters: {
    hasErrors: state => state.errors.length > 0 || !!state.globalError,
    latestError: state => state.errors[state.errors.length - 1],
    globalError: state => state.globalError,
    allErrors: state => state.errors
  }
}