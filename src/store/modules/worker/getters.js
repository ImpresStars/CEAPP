export default {
  isAuthenticated: state => !!state.worker,
  currentWorker: state => state.worker,
  error: state => state.error,
  isLoading: state => state.loading,
  isInitialized: state => state.initialized,
  currentJobs: state => state.currentJobs,
  serviceHistory: state => state.serviceHistory,
  workerLevel: state => state.worker?.level || 'Junior',
  certifications: state => state.worker?.certifications || []
}