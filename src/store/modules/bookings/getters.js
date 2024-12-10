export default {
  allBookings: state => state.bookings,
  upcomingBookings: state => {
    const now = new Date()
    return state.bookings
      .filter(booking => new Date(booking.date) > now && booking.status !== 'Cancelled')
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  },
  pastBookings: state => {
    const now = new Date()
    return state.bookings
      .filter(booking => new Date(booking.date) <= now || booking.status === 'Cancelled')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  },
  isLoading: state => state.loading,
  error: state => state.error,
  getBookingById: state => id => state.bookings.find(b => b.id === id)
}