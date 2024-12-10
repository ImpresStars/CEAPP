import { storage } from '../storage'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const userService = {
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
  },

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
  },

  async saveAddress(userId, addressData) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const user = users[userIndex]
      const addresses = user.addresses || []

      if (addressData.id) {
        // Update an existing address
        const addressIndex = addresses.findIndex(a => a.id === addressData.id)
        if (addressIndex === -1) {
          throw new Error('Address not found')
        }

        addresses[addressIndex] = {
          ...addresses[addressIndex],
          ...addressData,
          updatedAt: new Date().toISOString()
        }
      } else {
        // Add a new address
        const newAddress = {
          ...addressData,
          id: `${Date.now()}`, // Generate a simple unique ID
          createdAt: new Date().toISOString()
        }
        addresses.push(newAddress)
      }

      user.addresses = addresses
      users[userIndex] = user
      storage.set('users', users)

      return { success: true, data: addressData.id ? addresses.find(a => a.id === addressData.id) : addresses[addresses.length - 1] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async saveVehicle(userId, vehicleData) {
    await delay(500)
    try {
      const users = storage.get('users') || []
      const userIndex = users.findIndex(u => u.id === userId)

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const user = users[userIndex]
      const vehicles = user.vehicles || []

      if (vehicleData.id) {
        // Update an existing vehicle
        const vehicleIndex = vehicles.findIndex(v => v.id === vehicleData.id)
        if (vehicleIndex === -1) {
          throw new Error('Vehicle not found')
        }

        vehicles[vehicleIndex] = {
          ...vehicles[vehicleIndex],
          ...vehicleData,
          updatedAt: new Date().toISOString()
        }
      } else {
        // Add a new vehicle
        const newVehicle = {
          ...vehicleData,
          id: `${Date.now()}`, // Generate a simple unique ID
          createdAt: new Date().toISOString()
        }
        vehicles.push(newVehicle)
      }

      user.vehicles = vehicles
      users[userIndex] = user
      storage.set('users', users)

      return { success: true, data: vehicleData.id ? vehicles.find(v => v.id === vehicleData.id) : vehicles[vehicles.length - 1] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
};
