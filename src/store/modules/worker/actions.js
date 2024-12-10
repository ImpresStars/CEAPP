import { apiService } from '../../../services/api'
import { storage } from '../../../services/storage'

const WORKER_SESSION_KEY = 'workerSession'
const WORKER_DATA_KEY = 'workerData'

export default {
  async initialize({ commit }) {
    try {
      const sessionData = storage.get(WORKER_SESSION_KEY)
      const workerData = storage.get(WORKER_DATA_KEY)
      
      if (sessionData) {
        const worker = { ...sessionData, ...(workerData || {}) }
        const result = await apiService.getWorkerData(worker.id)
        if (result.success) {
          const updatedWorker = { ...worker, ...result.data }
          storage.set(WORKER_DATA_KEY, result.data)
          commit('SET_WORKER', updatedWorker)
          commit('SET_CURRENT_JOBS', result.data.currentJobs || [])
          commit('SET_SERVICE_HISTORY', result.data.serviceHistory || [])
        }
      }
      commit('SET_INITIALIZED', true)
      return { success: true }
    } catch (error) {
      console.error('Worker initialization error:', error)
      return { success: false, error: error.message }
    }
  },

  async login({ commit }, { workerId, password }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    
    try {
      const result = await apiService.workerLogin(workerId, password)
      if (result.success) {
        const workerData = await apiService.getWorkerData(result.data.id)
        const worker = { ...result.data, ...workerData.data }
        storage.set(WORKER_SESSION_KEY, result.data)
        storage.set(WORKER_DATA_KEY, workerData.data)
        commit('SET_WORKER', worker)
        commit('SET_CURRENT_JOBS', workerData.data.currentJobs || [])
        commit('SET_SERVICE_HISTORY', workerData.data.serviceHistory || [])
        return { success: true, data: worker }
      }
      throw new Error(result.error || 'Login failed')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateProfile({ commit, state }, profileData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const result = await apiService.updateWorkerProfile(state.worker.id, profileData)
      if (result.success) {
        const updatedWorker = { ...state.worker, ...result.data }
        storage.set(WORKER_SESSION_KEY, updatedWorker)
        storage.set(WORKER_DATA_KEY, result.data)
        commit('SET_WORKER', updatedWorker)
        return { success: true, data: updatedWorker }
      }
      throw new Error(result.error || 'Failed to update profile')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async acceptJob({ commit, state }, jobId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const result = await apiService.acceptWorkerJob(state.worker.id, jobId)
      if (result.success) {
        const updatedJobs = state.currentJobs.map(job => 
          job.id === jobId ? { ...job, status: 'Accepted' } : job
        )
        commit('SET_CURRENT_JOBS', updatedJobs)
        return { success: true, data: result.data }
      }
      throw new Error(result.error || 'Failed to accept job')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async completeJob({ commit, state }, { jobId, completionDetails }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const result = await apiService.completeWorkerJob(state.worker.id, jobId, completionDetails)
      if (result.success) {
        const updatedJobs = state.currentJobs.filter(job => job.id !== jobId)
        const updatedHistory = [...state.serviceHistory, result.data]
        commit('SET_CURRENT_JOBS', updatedJobs)
        commit('SET_SERVICE_HISTORY', updatedHistory)
        return { success: true, data: result.data }
      }
      throw new Error(result.error || 'Failed to complete job')
    } catch (error) {
      commit('SET_ERROR', error.message)
      return { success: false, error: error.message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async clearSession({ commit }) {
    try {
      storage.remove(WORKER_SESSION_KEY)
      storage.remove(WORKER_DATA_KEY)
      commit('RESET_STATE')
      return { success: true }
    } catch (error) {
      console.error('Error clearing worker session:', error)
      return { success: false, error: error.message }
    }
  },

  async logout({ dispatch }) {
    return dispatch('clearSession')
  }
}