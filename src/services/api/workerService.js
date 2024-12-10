import { storage } from '../storage'
import { TEST_CREDENTIALS } from '../../constants/credentials'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const workerService = {
  async workerLogin(workerId, password) {
    await delay(500)
    
    if (workerId === TEST_CREDENTIALS.worker.id && 
        password === TEST_CREDENTIALS.worker.password) {
      return { success: true, data: TEST_CREDENTIALS.worker.mockUser }
    }
    
    return { success: false, error: 'Invalid credentials' }
  },

  async getWorkerData(workerId) {
    await delay(500)
    try {
      const workers = storage.get('workers') || []
      const worker = workers.find(w => w.id === workerId)
      
      if (!worker) {
        throw new Error('Worker not found')
      }

      return { success: true, data: worker }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async updateWorkerProfile(workerId, profileData) {
    await delay(500)
    try {
      const workers = storage.get('workers') || []
      const workerIndex = workers.findIndex(w => w.id === workerId)
      
      if (workerIndex === -1) {
        throw new Error('Worker not found')
      }

      const updatedWorker = {
        ...workers[workerIndex],
        ...profileData,
        updatedAt: new Date().toISOString()
      }
      
      workers[workerIndex] = updatedWorker
      storage.set('workers', workers)
      
      return { success: true, data: updatedWorker }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}