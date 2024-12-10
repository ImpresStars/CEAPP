export default {
  SET_WORKER(state, worker) {
    state.worker = worker
  },
  UPDATE_WORKER(state, workerData) {
    state.worker = { ...state.worker, ...workerData }
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
  SET_CURRENT_JOBS(state, jobs) {
    state.currentJobs = jobs
  },
  SET_SERVICE_HISTORY(state, history) {
    state.serviceHistory = history
  },
  RESET_STATE(state) {
    state.worker = null
    state.error = null
    state.loading = false
    state.initialized = false
    state.currentJobs = []
    state.serviceHistory = []
  }
}