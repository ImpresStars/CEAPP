import { apiService } from '../../../services/api'
import { showSuccessNotification, showErrorNotification } from '../../../utils/notificationUtils'

export default {
  async fetchAddresses({ commit, rootState }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      if (!rootState.auth.user?.id) {
        throw new Error('User not authenticated')
      }

      const result = await apiService.getUserData(rootState.auth.user.id)
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch addresses')
      }
      
      commit('SET_ADDRESSES', result.data.addresses || [])
      return { success: true, data: result.data.addresses }
    } catch (error) {
      commit('SET_ERROR', error.message)
      showErrorNotification(error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async saveAddress({ commit, rootState, dispatch }, addressData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      if (!rootState.auth.user?.id) {
        throw new Error('User not authenticated')
      }

      const result = await apiService.saveAddress(rootState.auth.user.id, addressData)
      if (!result.success) {
        throw new Error(result.error || 'Failed to save address')
      }

      await dispatch('fetchAddresses')
      showSuccessNotification(addressData.id ? 'Address updated successfully' : 'Address added successfully')
      return { success: true, data: result.data }
    } catch (error) {
      commit('SET_ERROR', error.message)
      showErrorNotification(error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteAddress({ commit, rootState, dispatch }, addressId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      if (!rootState.auth.user?.id) {
        throw new Error('User not authenticated')
      }

      const result = await apiService.getUserData(rootState.auth.user.id)
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete address')
      }

      const addresses = result.data.addresses.filter(a => a.id !== addressId)
      const updateResult = await apiService.updateUserProfile(rootState.auth.user.id, { addresses })
      
      if (!updateResult.success) {
        throw new Error(updateResult.error || 'Failed to delete address')
      }

      await dispatch('fetchAddresses')
      showSuccessNotification('Address deleted successfully')
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', error.message)
      showErrorNotification(error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  resetState({ commit }) {
    commit('RESET_STATE')
  }
}