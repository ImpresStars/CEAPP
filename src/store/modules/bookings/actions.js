import { apiService } from '../../../services/api'

export default {
  async fetchBookings({ commit, rootState }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const result = await apiService.getUserData(rootState.auth.user?.id)
      if (result.success) {
        commit('SET_BOOKINGS', result.data.bookings || [])
        return { success: true, data: result.data.bookings }
      }
      throw new Error(result.error || 'Failed to fetch bookings')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createBooking({ commit, rootState }, bookingData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const result = await apiService.createBooking(rootState.auth.user.id, bookingData)
      if (result.success) {
        commit('ADD_BOOKING', result.data)
        return { success: true, data: result.data }
      }
      throw new Error(result.error || 'Failed to create booking')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async cancelBooking({ commit, rootState }, bookingId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const result = await apiService.updateBooking(rootState.auth.user.id, bookingId, {
        status: 'Cancelled',
        updatedAt: new Date().toISOString()
      })
      if (result.success) {
        commit('UPDATE_BOOKING', result.data)
        return { success: true, data: result.data }
      }
      throw new Error(result.error || 'Failed to cancel booking')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  resetBookings({ commit }) {
    commit('RESET_STATE')
  }
}