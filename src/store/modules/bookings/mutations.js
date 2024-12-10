export default {
  SET_BOOKINGS(state, bookings) {
    state.bookings = bookings
  },
  ADD_BOOKING(state, booking) {
    state.bookings.push(booking)
  },
  UPDATE_BOOKING(state, updatedBooking) {
    const index = state.bookings.findIndex(b => b.id === updatedBooking.id)
    if (index !== -1) {
      state.bookings.splice(index, 1, updatedBooking)
    }
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  RESET_STATE(state) {
    state.bookings = []
    state.loading = false
    state.error = null
  }
}