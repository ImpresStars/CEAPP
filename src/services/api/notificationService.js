import { storage } from '../storage'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const notificationService = {
  async sendNotification(userId, notification) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')

      const user = users[userIndex]
      const notifications = user.notifications || []

      const newNotification = {
        id: `not_${Date.now()}`,
        ...notification,
        read: false,
        createdAt: new Date().toISOString()
      }

      notifications.push(newNotification)
      user.notifications = notifications
      users[userIndex] = user
      storage.set('users', users)

      return { success: true, data: newNotification }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async getNotifications(userId) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const user = users.find(u => u.id === userId)
      if (!user) throw new Error('User not found')

      return {
        success: true,
        data: user.notifications || []
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async markNotificationAsRead(userId, notificationId) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')

      const user = users[userIndex]
      const notifications = user.notifications || []
      const notificationIndex = notifications.findIndex(n => n.id === notificationId)
      
      if (notificationIndex === -1) throw new Error('Notification not found')

      notifications[notificationIndex].read = true
      user.notifications = notifications
      users[userIndex] = user
      storage.set('users', users)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}