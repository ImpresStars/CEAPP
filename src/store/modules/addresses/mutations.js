export default {
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
    state.addresses = []
    state.loading = false
    state.error = null
  }
}