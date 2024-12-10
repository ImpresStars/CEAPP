import { storage } from '../storage'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const reviewService = {
  async createReview(userId, bookingId, reviewData) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')

      const user = users[userIndex]
      const bookingIndex = user.bookings.findIndex(b => b.id === bookingId)
      if (bookingIndex === -1) throw new Error('Booking not found')

      const review = {
        id: `rev_${Date.now()}`,
        ...reviewData,
        userId,
        bookingId,
        createdAt: new Date().toISOString()
      }

      // Add review to booking
      user.bookings[bookingIndex].review = review
      users[userIndex] = user
      storage.set('users', users)

      // Update worker rating if worker is assigned
      if (user.bookings[bookingIndex].workerId) {
        const workers = storage.get('workers') || []
        const workerIndex = workers.findIndex(w => w.id === user.bookings[bookingIndex].workerId)
        if (workerIndex !== -1) {
          const reviews = workers[workerIndex].reviews || []
          reviews.push(review)
          workers[workerIndex].reviews = reviews
          storage.set('workers', workers)
        }
      }

      return { success: true, data: review }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async getReviews(bookingId) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      let review = null

      for (const user of users) {
        const booking = user.bookings?.find(b => b.id === bookingId)
        if (booking?.review) {
          review = booking.review
          break
        }
      }

      return { success: true, data: review }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}