import { apiService } from '../../../services/api'
import { storage } from '../../../services/storage'

const MANAGEMENT_SESSION_KEY = 'managementSession'
const MANAGEMENT_DATA_KEY = 'managementData'

export default {
  async initialize({ commit }) {
    try {
      const sessionData = storage.get(MANAGEMENT_SESSION_KEY)
      const managementData = storage.get(MANAGEMENT_DATA_KEY)
      
      if (sessionData) {
        const user = { ...sessionData, ...(managementData || {}) }
        const result = await apiService.getManagementData(user.id)
        if (result.success) {
          const updatedUser = { ...user, ...result.data }
          storage.set(MANAGEMENT_DATA_KEY, result.data)
          commit('SET_USER', updatedUser)
          commit('UPDATE_STATISTICS', result.data.statistics)
        }
      }
      commit('SET_INITIALIZED', true)
      return { success: true }
    } catch (error) {
      console.error('Management initialization error:', error)
      return { success: false, error: error.message }
    }
  },

  async login({ commit }, { username, password }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const result = await apiService.managementLogin(username, password)
      if (result.success) {
        const managementData = await apiService.getManagementData(result.data.id)
        const user = { ...result.data, ...managementData.data }
        storage.set(MANAGEMENT_SESSION_KEY, result.data)
        storage.set(MANAGEMENT_DATA_KEY, managementData.data)
        commit('SET_USER', user)
        commit('UPDATE_STATISTICS', managementData.data.statistics)
        return { success: true, data: user }
      }
      throw new Error(result.error || 'Login failed')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateStatistics({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const result = await apiService.getManagementStatistics()
      if (result.success) {
        commit('UPDATE_STATISTICS', result.data)
        return { success: true, data: result.data }
      }
      throw new Error(result.error || 'Failed to update statistics')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async clearSession({ commit }) {
    try {
      storage.remove(MANAGEMENT_SESSION_KEY)
      storage.remove(MANAGEMENT_DATA_KEY)
      commit('RESET_STATE')
      return { success: true }
    } catch (error) {
      console.error('Error clearing management session:', error)
      return { success: false, error: error.message }
    }
  },

  async logout({ dispatch }) {
    return dispatch('clearSession')
  }
}