import { storage } from './storage'
import { generateId } from '../utils/idUtils'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export class AddressService {
  static async getAddresses(userId) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const user = users.find(u => u.id === userId)
      
      if (!user) {
        throw new Error('User not found')
      }

      return {
        success: true,
        data: user.addresses || []
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async saveAddress(userId, addressData) {
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
          id: generateId('addr'),
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

  static async deleteAddress(userId, addressId) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)
      if (userIndex === -1) throw new Error('User not found')

      const user = users[userIndex]
      const addresses = user.addresses || []
      
      const index = addresses.findIndex(a => a.id === addressId)
      if (index === -1) throw new Error('Address not found')

      addresses.splice(index, 1)
      user.addresses = addresses
      users[userIndex] = user
      storage.set('users', users)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}