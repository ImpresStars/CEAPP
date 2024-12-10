export default {
  allAddresses: state => state.addresses,
  isLoading: state => state.loading,
  error: state => state.error,
  getAddressById: state => id => state.addresses.find(a => a.id === id)
}