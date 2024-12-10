import { storage } from '../storage'
import { TEST_CREDENTIALS } from '../../constants/credentials'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const authService = {
  async login(credentials) {
    await delay(500)
    
    if (credentials.email === TEST_CREDENTIALS.client.email && 
        credentials.password === TEST_CREDENTIALS.client.password) {
      const user = storage.get('users')?.find(u => u.email === credentials.email) || 
                   TEST_CREDENTIALS.client.mockUser
      
      // Generate mock tokens
      const token = `token_${Date.now()}`
      const refreshToken = `refresh_${Date.now()}`
      
      return { 
        success: true, 
        data: {
          user,
          token,
          refreshToken
        }
      }
    }
    
    return { success: false, error: 'Invalid credentials' }
  },

  async refreshToken(refreshToken) {
    await delay(500)
    
    if (refreshToken?.startsWith('refresh_')) {
      return {
        success: true,
        data: {
          token: `token_${Date.now()}`,
          refreshToken: `refresh_${Date.now()}`
        }
      }
    }
    
    return { success: false, error: 'Invalid refresh token' }
  },

  async logout() {
    await delay(500)
    return { success: true }
  }
}