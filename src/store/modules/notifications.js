import { notificationService } from '../../services/api'

export default {
  namespaced: true,

  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  }),

  mutations: {
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications
      state.unreadCount = notifications.filter(n => !n.read).length
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.unshift(notification)
      if (!notification.read) {
        state.unreadCount++
      }
    },
    MARK_AS_READ(state, notificationId) {
      const notification = state.notifications.find(n => n.id === notificationId)
      if (notification && !notification.read) {
        notification.read = true
        state.unreadCount--
      }
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async fetchNotifications({ commit }) {
      commit('SET_LOADING', true)
      try {
        const result = await notificationService.getNotifications()
        if (result.success) {
          commit('SET_NOTIFICATIONS', result.data)
        }
        return result
      } catch (error) {
        commit('SET_ERROR', error.message)
        return { success: false, error: error.message }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async markAsRead({ commit }, notificationId) {
      try {
        const result = await notificationService.markNotificationAsRead(notificationId)
        if (result.success) {
          commit('MARK_AS_READ', notificationId)
        }
        return result
      } catch (error) {
        return { success: false, error: error.message }
      }
    }
  },

  getters: {
    allNotifications: state => state.notifications,
    unreadNotifications: state => state.notifications.filter(n => !n.read),
    unreadCount: state => state.unreadCount,
    isLoading: state => state.loading,
    error: state => state.error
  }
}