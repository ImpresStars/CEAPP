export default {
  SET_USER(state, user) {
    state.user = user
  },
  UPDATE_USER(state, userData) {
    state.user = { ...state.user, ...userData }
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
  UPDATE_STATISTICS(state, statistics) {
    state.statistics = { ...state.statistics, ...statistics }
  },
  RESET_STATE(state) {
    state.user = null
    state.error = null
    state.loading = false
    state.initialized = false
    state.statistics = {
      totalBookings: 0,
      activeWorkers: 0,
      totalRevenue: 0,
      customerSatisfaction: 0
    }
  }
}