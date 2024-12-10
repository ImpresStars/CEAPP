import { TEST_CREDENTIALS } from '../constants/credentials'
import { storage } from './storage'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class ApiService {
  async login(credentials) {
    await delay(500)
    
    if (credentials.email === TEST_CREDENTIALS.client.email && 
        credentials.password === TEST_CREDENTIALS.client.password) {
      const user = storage.get('users')?.find(u => u.email === credentials.email) || 
                   TEST_CREDENTIALS.client.mockUser
      return { success: true, data: { user } }
    }
    
    return { success: false, error: 'Invalid email or password' }
  }

  async getUserData(userId) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const user = users.find(u => u.id === userId)
      
      if (!user) {
        throw new Error('User not found')
      }

      return {
        success: true,
        data: {
          addresses: user.addresses || [],
          vehicles: user.vehicles || [],
          bookings: user.bookings || []
        }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async saveAddress(userId, addressData) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')

      const user = users[userIndex]
      const addresses = user.addresses || []

      let updatedAddress
      if (addressData.id) {
        const index = addresses.findIndex(a => a.id === addressData.id)
        if (index === -1) throw new Error('Address not found')
        
        updatedAddress = {
          ...addresses[index],
          ...addressData,
          updatedAt: new Date().toISOString()
        }
        addresses[index] = updatedAddress
      } else {
        updatedAddress = {
          ...addressData,
          id: `addr_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        addresses.push(updatedAddress)
      }

      user.addresses = addresses
      users[userIndex] = user
      storage.set('users', users)

      return { success: true, data: updatedAddress }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async updateUserProfile(userId, profileData) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)
      
      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const updatedUser = {
        ...users[userIndex],
        ...profileData,
        updatedAt: new Date().toISOString()
      }
      
      users[userIndex] = updatedUser
      storage.set('users', users)
      
      return { success: true, data: updatedUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async logout() {
    await delay(500)
    return { success: true }
  }
}

export const apiService = new ApiService()