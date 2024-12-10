import { mockApiService } from '../../services/mockApi'

export default {
  namespaced: true,

  state: () => ({
    history: [],
    loading: false,
    error: null
  }),

  mutations: {
    SET_HISTORY(state, history) {
      state.history = history
    },
    ADD_HISTORY(state, record) {
      state.history.push(record)
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async fetchHistory({ commit, rootState }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await mockApiService.getTableData('serviceHistory')
        const filteredHistory = result.filter(record => {
          if (rootState.auth.user) {
            return record.clientId === rootState.auth.user.id
          }
          if (rootState.worker.worker) {
            return record.workerId === rootState.worker.worker.id
          }
          return true // For management view, show all
        })
        commit('SET_HISTORY', filteredHistory)
        return { success: true, data: filteredHistory }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async addHistoryRecord({ commit }, record) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await mockApiService.createRecord('serviceHistory', {
          ...record,
          timestamp: new Date().toISOString()
        })
        commit('ADD_HISTORY', result)
        return { success: true, data: result }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    allHistory: state => state.history,
    isLoading: state => state.loading,
    error: state => state.error,
    
    historyByUser: state => userId => {
      return state.history.filter(record => record.clientId === userId)
    },
    
    historyByWorker: state => workerId => {
      return state.history.filter(record => record.workerId === workerId)
    }
  }
}