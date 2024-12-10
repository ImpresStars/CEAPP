import { apiService } from '../../services/api'
import { storage } from '../../services/storage'

const SETTINGS_KEY = 'appSettings'

const DEFAULT_SETTINGS = {
  service: {
    minAdvanceHours: 48,
    maxAdvanceDays: 30,
    startTime: '08:00',
    endTime: '18:00',
    weekendService: false,
    holidayService: false
  },
  pricing: {
    services: [
      { type: 'house', name: 'House Cleaning (per hour)', basePrice: 50 },
      { type: 'commercial', name: 'Commercial Cleaning (per hour)', basePrice: 75 },
      { type: 'vehicle', name: 'Vehicle Detailing (base price)', basePrice: 100 }
    ]
  },
  worker: {
    maxDailyBookings: 8,
    breakTimeMins: 30
  },
  client: {
    maxActiveBookings: 3,
    cancellationHours: 24
  }
}

export default {
  namespaced: true,

  state: () => ({
    settings: { ...DEFAULT_SETTINGS },
    loading: false,
    error: null
  }),

  mutations: {
    SET_SETTINGS(state, settings) {
      state.settings = settings
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async fetchSettings({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const storedSettings = storage.get(SETTINGS_KEY)
        if (storedSettings) {
          commit('SET_SETTINGS', storedSettings)
        } else {
          storage.set(SETTINGS_KEY, DEFAULT_SETTINGS)
          commit('SET_SETTINGS', DEFAULT_SETTINGS)
        }
        return { success: true }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async saveSettings({ commit }, settings) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        storage.set(SETTINGS_KEY, settings)
        commit('SET_SETTINGS', settings)
        return { success: true, data: settings }
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    allSettings: state => state.settings,
    serviceSettings: state => state.settings.service,
    pricingSettings: state => state.settings.pricing,
    workerSettings: state => state.settings.worker,
    clientSettings: state => state.settings.client,
    isLoading: state => state.loading,
    error: state => state.error
  }
}