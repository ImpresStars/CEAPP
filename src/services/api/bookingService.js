import { storage } from '../storage'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const bookingService = {
  async createBooking(userId, bookingData) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')

      const user = users[userIndex]
      const bookings = user.bookings || []

      const newBooking = {
        ...bookingData,
        id: `bkg_${Date.now()}`,
        status: 'Pending',
        createdAt: new Date().toISOString()
      }

      bookings.push(newBooking)
      user.bookings = bookings
      users[userIndex] = user
      storage.set('users', users)

      return { success: true, data: newBooking }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async updateBooking(userId, bookingId, updateData) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')

      const user = users[userIndex]
      const bookings = user.bookings || []
      const bookingIndex = bookings.findIndex(b => b.id === bookingId)
      if (bookingIndex === -1) throw new Error('Booking not found')

      const updatedBooking = {
        ...bookings[bookingIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      }

      bookings[bookingIndex] = updatedBooking
      user.bookings = bookings
      users[userIndex] = user
      storage.set('users', users)

      return { success: true, data: updatedBooking }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}