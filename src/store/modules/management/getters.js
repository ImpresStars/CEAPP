export default {
  isAuthenticated: state => !!state.user,
  currentUser: state => state.user,
  error: state => state.error,
  isLoading: state => state.loading,
  isInitialized: state => state.initialized,
  statistics: state => state.statistics,
  hasFullAccess: state => state.user?.permissions?.includes('all') || false
}