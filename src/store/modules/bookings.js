import { apiService } from '../../services/api'
import { storage } from '../../services/storage'

const BOOKINGS_KEY = 'userBookings'

const initialState = {
  bookings: [],
  loading: false,
  error: null
}

export default {
  namespaced: true,
  
  state: () => ({ ...initialState }),

  mutations: {
    SET_BOOKINGS(state, bookings) {
      state.bookings = bookings
    },
    ADD_BOOKING(state, booking) {
      state.bookings.push(booking)
    },
    UPDATE_BOOKING(state, updatedBooking) {
      const index = state.bookings.findIndex(b => b.id === updatedBooking.id)
      if (index !== -1) {
        state.bookings.splice(index, 1, updatedBooking)
      }
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    RESET_STATE(state) {
      Object.assign(state, initialState)
    }
  },

  actions: {
    async fetchBookings({ commit, rootState }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.getUserData(rootState.auth.user?.id)
        if (result.success) {
          const bookings = result.data.bookings || []
          storage.set(BOOKINGS_KEY, bookings)
          commit('SET_BOOKINGS', bookings)
          return { success: true, data: bookings }
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
        const newBooking = {
          ...bookingData,
          id: `bkg_${Date.now()}`,
          userId: rootState.auth.user.id,
          status: 'Pending',
          createdAt: new Date().toISOString()
        }

        const bookings = storage.get(BOOKINGS_KEY) || []
        const updatedBookings = [...bookings, newBooking]
        storage.set(BOOKINGS_KEY, updatedBookings)
        
        commit('ADD_BOOKING', newBooking)
        return { success: true, data: newBooking }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async cancelBooking({ commit }, bookingId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const bookings = storage.get(BOOKINGS_KEY) || []
        const updatedBookings = bookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'Cancelled', updatedAt: new Date().toISOString() }
            : booking
        )
        
        storage.set(BOOKINGS_KEY, updatedBookings)
        const cancelledBooking = updatedBookings.find(b => b.id === bookingId)
        commit('UPDATE_BOOKING', cancelledBooking)
        
        return { success: true, data: cancelledBooking }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    resetBookings({ commit }) {
      commit('RESET_STATE')
      storage.remove(BOOKINGS_KEY)
    }
  },

  getters: {
    allBookings: state => state.bookings,
    upcomingBookings: state => {
      const now = new Date()
      return state.bookings
        .filter(booking => new Date(booking.date) > now && booking.status !== 'Cancelled')
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    },
    pastBookings: state => {
      const now = new Date()
      return state.bookings
        .filter(booking => new Date(booking.date) <= now || booking.status === 'Cancelled')
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    isLoading: state => state.loading,
    error: state => state.error
  }
}