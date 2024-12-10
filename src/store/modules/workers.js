import { apiService } from '../../services/api'
import { storage } from '../../services/storage'

const WORKERS_KEY = 'systemWorkers'

export default {
  namespaced: true,
  
  state: () => ({
    workers: [],
    recentActivity: [],
    error: null,
    loading: false,
    initialized: false
  }),

  mutations: {
    SET_WORKERS(state, workers) {
      state.workers = workers
    },
    SET_RECENT_ACTIVITY(state, activity) {
      state.recentActivity = activity
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
      state.workers = []
      state.recentActivity = []
      state.error = null
      state.loading = false
      state.initialized = false
    }
  },

  actions: {
    async fetchWorkers({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.getWorkers()
        if (result.success) {
          storage.set(WORKERS_KEY, result.data)
          commit('SET_WORKERS', result.data)
          return { success: true, data: result.data }
        }
        throw new Error(result.error || 'Failed to fetch workers')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchRecentActivity({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.getWorkerActivity()
        if (result.success) {
          commit('SET_RECENT_ACTIVITY', result.data)
          return { success: true, data: result.data }
        }
        throw new Error(result.error || 'Failed to fetch worker activity')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createWorker({ commit }, workerData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.createWorker(workerData)
        if (result.success) {
          const workers = storage.get(WORKERS_KEY) || []
          const updatedWorkers = [...workers, result.data]
          storage.set(WORKERS_KEY, updatedWorkers)
          commit('SET_WORKERS', updatedWorkers)
          return { success: true, data: result.data }
        }
        throw new Error(result.error || 'Failed to create worker')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateWorker({ commit }, { id, data }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.updateWorker(id, data)
        if (result.success) {
          const workers = storage.get(WORKERS_KEY) || []
          const updatedWorkers = workers.map(w => 
            w.id === id ? { ...w, ...result.data } : w
          )
          storage.set(WORKERS_KEY, updatedWorkers)
          commit('SET_WORKERS', updatedWorkers)
          return { success: true, data: result.data }
        }
        throw new Error(result.error || 'Failed to update worker')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteWorker({ commit }, workerId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.deleteWorker(workerId)
        if (result.success) {
          const workers = storage.get(WORKERS_KEY) || []
          const updatedWorkers = workers.filter(w => w.id !== workerId)
          storage.set(WORKERS_KEY, updatedWorkers)
          commit('SET_WORKERS', updatedWorkers)
          return { success: true }
        }
        throw new Error(result.error || 'Failed to delete worker')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    allWorkers: state => state.workers,
    activeWorkers: state => state.workers.filter(w => w.status === 'Active'),
    recentActivity: state => state.recentActivity,
    error: state => state.error,
    isLoading: state => state.loading,
    isInitialized: state => state.initialized
  }
}