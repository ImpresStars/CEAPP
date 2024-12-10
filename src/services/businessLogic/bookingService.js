import { calculateBookingTotal } from '../../utils/bookingUtils'
import { validateAddress } from '../../utils/addressUtils'
import { validateVehicle } from '../../utils/vehicleUtils'
import { getServiceRequirements } from '../../utils/serviceUtils'
import { apiService } from '../api'

export class BookingService {
  static async createBooking(bookingData, userId) {
    // Validate address
    if (!validateAddress(bookingData.address)) {
      throw new Error('Invalid address provided')
    }

    // Validate vehicle if required
    if (bookingData.serviceType === 'Vehicle Detailing' && !validateVehicle(bookingData.vehicle)) {
      throw new Error('Invalid vehicle details provided')
    }

    // Calculate total
    const total = calculateBookingTotal(
      bookingData.serviceType,
      bookingData.duration,
      bookingData.extras
    )

    // Create booking with validated data
    const result = await apiService.createBooking(userId, {
      ...bookingData,
      total,
      requirements: getServiceRequirements(bookingData.serviceType)
    })

    if (!result.success) {
      throw new Error(result.error || 'Failed to create booking')
    }

    return result.data
  }

  static async cancelBooking(bookingId, userId) {
    const result = await apiService.updateBooking(userId, bookingId, {
      status: 'Cancelled',
      cancelledAt: new Date().toISOString()
    })

    if (!result.success) {
      throw new Error(result.error || 'Failed to cancel booking')
    }

    return result.data
  }

  static async rescheduleBooking(bookingId, userId, newDate) {
    const result = await apiService.updateBooking(userId, bookingId, {
      date: newDate,
      rescheduledAt: new Date().toISOString()
    })

    if (!result.success) {
      throw new Error(result.error || 'Failed to reschedule booking')
    }

    return result.data
  }
}