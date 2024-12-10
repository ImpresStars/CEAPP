import { apiService } from '../../services/api'
import { storage } from '../../services/storage'

const VEHICLES_KEY = 'userVehicles'

const initialState = {
  vehicles: [],
  loading: false,
  error: null
}

export default {
  namespaced: true,
  
  state: () => ({ ...initialState }),

  mutations: {
    SET_VEHICLES(state, vehicles) {
      state.vehicles = vehicles
    },
    ADD_VEHICLE(state, vehicle) {
      state.vehicles.push(vehicle)
    },
    UPDATE_VEHICLE(state, updatedVehicle) {
      const index = state.vehicles.findIndex(v => v.id === updatedVehicle.id)
      if (index !== -1) {
        state.vehicles.splice(index, 1, updatedVehicle)
      }
    },
    REMOVE_VEHICLE(state, vehicleId) {
      state.vehicles = state.vehicles.filter(v => v.id !== vehicleId)
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
    async fetchVehicles({ commit, rootState }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.getUserData(rootState.auth.user?.id)
        if (result.success) {
          const vehicles = result.data.vehicles || []
          storage.set(VEHICLES_KEY, vehicles)
          commit('SET_VEHICLES', vehicles)
          return { success: true, data: vehicles }
        }
        throw new Error(result.error || 'Failed to fetch vehicles')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async saveVehicle({ dispatch }, vehicleData) {
      // New `saveVehicle` action that decides to create or update a vehicle based on the presence of an ID
      if (vehicleData.id) {
        return await dispatch('updateVehicle', { id: vehicleData.id, data: vehicleData })
      } else {
        return await dispatch('createVehicle', vehicleData)
      }
    },

    async createVehicle({ commit, rootState }, vehicleData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.saveVehicle(rootState.auth.user.id, vehicleData)
        if (result.success) {
          commit('ADD_VEHICLE', result.data)
          return { success: true, data: result.data }
        }
        throw new Error(result.error || 'Failed to create vehicle')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateVehicle({ commit, rootState }, { id, data }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.saveVehicle(rootState.auth.user.id, { ...data, id })
        if (result.success) {
          commit('UPDATE_VEHICLE', result.data)
          return { success: true, data: result.data }
        }
        throw new Error(result.error || 'Failed to update vehicle')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteVehicle({ commit, rootState }, vehicleId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.getUserData(rootState.auth.user.id)
        if (result.success) {
          const vehicles = result.data.vehicles.filter(v => v.id !== vehicleId)
          await apiService.updateUserProfile(rootState.auth.user.id, { vehicles })
          commit('REMOVE_VEHICLE', vehicleId)
          return { success: true }
        }
        throw new Error('Failed to delete vehicle')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    resetVehicles({ commit }) {
      commit('RESET_STATE')
      storage.remove(VEHICLES_KEY)
    }
  },

  getters: {
    allVehicles: state => state.vehicles,
    isLoading: state => state.loading,
    error: state => state.error
  }
}
