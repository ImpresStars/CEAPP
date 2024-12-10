import { paymentService } from '../../services/api'

export default {
  namespaced: true,

  state: () => ({
    paymentMethods: [],
    loading: false,
    error: null
  }),

  mutations: {
    SET_PAYMENT_METHODS(state, methods) {
      state.paymentMethods = methods
    },
    ADD_PAYMENT_METHOD(state, method) {
      state.paymentMethods.push(method)
    },
    REMOVE_PAYMENT_METHOD(state, methodId) {
      state.paymentMethods = state.paymentMethods.filter(m => m.id !== methodId)
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async fetchPaymentMethods({ commit }) {
      commit('SET_LOADING', true)
      try {
        const result = await paymentService.getPaymentMethods()
        if (result.success) {
          commit('SET_PAYMENT_METHODS', result.data)
        }
        return result
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async addPaymentMethod({ commit }, paymentMethod) {
      commit('SET_LOADING', true)
      try {
        const result = await paymentService.addPaymentMethod(paymentMethod)
        if (result.success) {
          commit('ADD_PAYMENT_METHOD', result.data)
        }
        return result
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async processPayment({ commit }, { bookingId, paymentDetails }) {
      commit('SET_LOADING', true)
      try {
        const result = await paymentService.processPayment(bookingId, paymentDetails)
        return result
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    allPaymentMethods: state => state.paymentMethods,
    defaultPaymentMethod: state => state.paymentMethods.find(m => m.isDefault),
    isLoading: state => state.loading,
    error: state => state.error
  }
}