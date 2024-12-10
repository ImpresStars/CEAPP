import { validateEmail, validatePhone, validatePassword } from '../../utils/validationUtils'
import { calculateLoyaltyPoints, getClientTier } from '../../utils/clientUtils'
import { apiService } from '../api'

export class UserService {
  static async updateProfile(userId, profileData) {
    // Validate email and phone
    if (!validateEmail(profileData.email)) {
      throw new Error('Invalid email address')
    }

    if (!validatePhone(profileData.phone)) {
      throw new Error('Invalid phone number')
    }

    // Update profile
    const result = await apiService.updateUserProfile(userId, profileData)

    if (!result.success) {
      throw new Error(result.error || 'Failed to update profile')
    }

    return result.data
  }

  static async upgradeToCommercial(userId) {
    const result = await apiService.updateUserProfile(userId, {
      accountType: 'Commercial',
      accountHistory: [{
        type: 'Commercial',
        timestamp: new Date().toISOString()
      }]
    })

    if (!result.success) {
      throw new Error(result.error || 'Failed to upgrade account')
    }

    return result.data
  }

  static calculateUserMetrics(userData) {
    return {
      loyaltyPoints: calculateLoyaltyPoints(userData.bookings),
      tier: getClientTier(userData),
      totalBookings: userData.bookings?.length || 0,
      activeAddresses: userData.addresses?.length || 0,
      activeVehicles: userData.vehicles?.length || 0
    }
  }
}