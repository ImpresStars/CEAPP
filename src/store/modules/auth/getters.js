export default {
  isAuthenticated: state => !!state.user,
  currentUser: state => state.user,
  error: state => state.error,
  isLoading: state => state.loading,
  isInitialized: state => state.initialized
}