import { apiService } from '../../services/api'
import { storage } from '../../services/storage'

const ADDRESSES_KEY = 'userAddresses'

const initialState = {
  addresses: [],
  loading: false,
  error: null
}

export default {
  namespaced: true,

  state: () => ({ ...initialState }),

  mutations: {
    SET_ADDRESSES(state, addresses) {
      state.addresses = addresses
    },
    ADD_ADDRESS(state, address) {
      state.addresses.push(address)
    },
    UPDATE_ADDRESS(state, updatedAddress) {
      const index = state.addresses.findIndex(a => a.id === updatedAddress.id)
      if (index !== -1) {
        state.addresses.splice(index, 1, updatedAddress)
      }
    },
    REMOVE_ADDRESS(state, addressId) {
      state.addresses = state.addresses.filter(a => a.id !== addressId)
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
    async fetchAddresses({ commit, rootState }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.getUserData(rootState.auth.user?.id)
        if (result.success) {
          const addresses = result.data.addresses || []
          storage.set(ADDRESSES_KEY, addresses)
          commit('SET_ADDRESSES', addresses)
          return { success: true, data: addresses }
        }
        throw new Error(result.error || 'Failed to fetch addresses')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createAddress({ commit, rootState }, addressData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.saveAddress(rootState.auth.user.id, addressData)
        if (result.success) {
          commit('ADD_ADDRESS', result.data)
          return { success: true, data: result.data }
        }
        throw new Error(result.error || 'Failed to create address')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateAddress({ commit, rootState }, { id, data }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.saveAddress(rootState.auth.user.id, { ...data, id })
        if (result.success) {
          commit('UPDATE_ADDRESS', result.data)
          return { success: true, data: result.data }
        }
        throw new Error(result.error || 'Failed to update address')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async deleteAddress({ commit, rootState }, addressId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await apiService.getUserData(rootState.auth.user.id)
        if (result.success) {
          const addresses = result.data.addresses.filter(a => a.id !== addressId)
          await apiService.updateUserProfile(rootState.auth.user.id, { addresses })
          commit('REMOVE_ADDRESS', addressId)
          return { success: true }
        }
        throw new Error('Failed to delete address')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    resetAddresses({ commit }) {
      commit('RESET_STATE')
      storage.remove(ADDRESSES_KEY)
    }
  },

  getters: {
    allAddresses: state => state.addresses,
    isLoading: state => state.loading,
    error: state => state.error
  }
}