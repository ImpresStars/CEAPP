import { storage } from '../storage'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const paymentService = {
  async processPayment(userId, bookingId, paymentDetails) {
    await delay(500)
    try {
      // Mock payment processing
      const paymentResult = {
        success: true,
        transactionId: `tr_${Date.now()}`,
        amount: paymentDetails.amount,
        currency: 'USD',
        timestamp: new Date().toISOString()
      }

      if (paymentResult.success) {
        // Update booking with payment information
        const users = storage.get('users') || []
        const userIndex = users.findIndex(u => u.id === userId)
        if (userIndex === -1) throw new Error('User not found')

        const user = users[userIndex]
        const bookingIndex = user.bookings.findIndex(b => b.id === bookingId)
        if (bookingIndex === -1) throw new Error('Booking not found')

        user.bookings[bookingIndex].payment = {
          ...paymentResult,
          method: paymentDetails.method,
          last4: paymentDetails.last4
        }

        users[userIndex] = user
        storage.set('users', users)
      }

      return { success: true, data: paymentResult }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async getPaymentMethods(userId) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const user = users.find(u => u.id === userId)
      if (!user) throw new Error('User not found')

      return {
        success: true,
        data: user.paymentMethods || []
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async addPaymentMethod(userId, paymentMethod) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')

      const user = users[userIndex]
      const paymentMethods = user.paymentMethods || []

      const newPaymentMethod = {
        id: `pm_${Date.now()}`,
        ...paymentMethod,
        createdAt: new Date().toISOString()
      }

      paymentMethods.push(newPaymentMethod)
      user.paymentMethods = paymentMethods
      users[userIndex] = user
      storage.set('users', users)

      return { success: true, data: newPaymentMethod }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}