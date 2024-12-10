export default {
  SET_USER(state, user) {
    state.user = user
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_INITIALIZED(state, initialized) {
    state.initialized = initialized
  },
  RESET_STATE(state) {
    state.user = null
    state.error = null
    state.loading = false
    state.initialized = false
  }
}