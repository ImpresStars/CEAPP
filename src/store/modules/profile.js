import { mockApiService } from '../../services/mockApi'

export default {
  namespaced: true,

  state: () => ({
    loading: false,
    error: null
  }),

  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async updateProfile({ commit, dispatch }, profileData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const result = await mockApiService.updateRecord('clients', profileData.id, profileData)
        if (result) {
          await dispatch('auth/updateUser', result, { root: true })
          return { success: true, data: result }
        }
        throw new Error('Failed to update profile')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async upgradeAccount({ commit, dispatch, rootState }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        const user = rootState.auth.user
        if (!user) throw new Error('User not found')

        const updatedUser = {
          ...user,
          accountType: 'Commercial',
          accountHistory: [
            ...(user.accountHistory || []),
            {
              type: 'Commercial',
              timestamp: new Date().toISOString()
            }
          ]
        }

        const result = await mockApiService.updateRecord('clients', user.id, updatedUser)
        if (result) {
          await dispatch('auth/updateUser', result, { root: true })
          return { success: true, data: result }
        }
        throw new Error('Failed to upgrade account')
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    isLoading: state => state.loading,
    error: state => state.error
  }
}