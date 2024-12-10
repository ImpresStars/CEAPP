import { storage } from '../storage'
import { TEST_CREDENTIALS } from '../../constants/credentials'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const managementService = {
  async managementLogin(username, password) {
    await delay(500)
    
    if (username === TEST_CREDENTIALS.management.username && 
        password === TEST_CREDENTIALS.management.password) {
      return { success: true, data: TEST_CREDENTIALS.management.mockUser }
    }
    
    return { success: false, error: 'Invalid credentials' }
  },

  async getManagementData(userId) {
    await delay(500)
    try {
      const statistics = {
        totalBookings: 156,
        activeWorkers: 12,
        totalRevenue: 24500,
        customerSatisfaction: 94
      }
      
      return { success: true, data: { statistics } }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async getManagementStatistics() {
    await delay(500)
    try {
      return {
        success: true,
        data: {
          totalBookings: 156,
          activeWorkers: 12,
          totalRevenue: 24500,
          customerSatisfaction: 94
        }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}