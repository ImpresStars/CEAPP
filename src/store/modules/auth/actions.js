import { apiService } from '../../../services/api'
import { storage } from '../../../services/storage'
import { showSuccessNotification, showErrorNotification } from '../../../utils/notificationUtils'

export default {
  async initialize({ commit }) {
    try {
      const userData = storage.get('userData')
      if (userData) {
        commit('SET_USER', userData)
      }
      commit('SET_INITIALIZED', true)
      return { success: true }
    } catch (error) {
      console.error('Initialization error:', error)
      return { success: false, error: error.message }
    }
  },

  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const result = await apiService.login(credentials)
      if (!result.success) {
        throw new Error(result.error || 'Login failed')
      }

      const { user } = result.data
      storage.set('userData', user)
      commit('SET_USER', user)
      
      showSuccessNotification('Successfully logged in!')
      return { success: true, data: user }
    } catch (error) {
      commit('SET_ERROR', error.message)
      showErrorNotification(error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async logout({ commit, dispatch }) {
    try {
      await apiService.logout()
      storage.remove('userData')
      
      // Reset all relevant store modules
      commit('RESET_STATE')
      
      showSuccessNotification('Successfully logged out!')
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      showErrorNotification('Error during logout')
      return { success: false, error: error.message }
    }
  },

  async updateUser({ commit }, userData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const result = await apiService.updateUserProfile(userData.id, userData)
      if (!result.success) {
        throw new Error(result.error || 'Failed to update profile')
      }

      storage.set('userData', result.data)
      commit('SET_USER', result.data)
      return { success: true, data: result.data }
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  }
}