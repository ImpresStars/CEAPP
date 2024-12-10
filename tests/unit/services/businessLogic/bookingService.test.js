import { describe, it, expect, vi } from 'vitest'
import { BookingService } from '../../../../src/services/businessLogic/bookingService'
import { apiService } from '../../../../src/services/api'

vi.mock('../../../../src/services/api', () => ({
  apiService: {
    createBooking: vi.fn(),
    updateBooking: vi.fn()
  }
}))

describe('BookingService', () => {
  describe('createBooking', () => {
    it('should create a booking successfully', async () => {
      const mockBookingData = {
        serviceType: 'House Cleaning',
        duration: 2,
        address: {
          street: '123 Main St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345'
        }
      }

      const mockResponse = {
        success: true,
        data: { ...mockBookingData, id: 'booking_123' }
      }

      apiService.createBooking.mockResolvedValue(mockResponse)

      const result = await BookingService.createBooking(mockBookingData, 'user_123')
      expect(result).toEqual(mockResponse.data)
      expect(apiService.createBooking).toHaveBeenCalled()
    })

    it('should throw error for invalid address', async () => {
      const mockBookingData = {
        serviceType: 'House Cleaning',
        duration: 2,
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      }

      await expect(BookingService.createBooking(mockBookingData, 'user_123'))
        .rejects
        .toThrow('Invalid address provided')
    })
  })

  describe('cancelBooking', () => {
    it('should cancel a booking successfully', async () => {
      const mockResponse = {
        success: true,
        data: { id: 'booking_123', status: 'Cancelled' }
      }

      apiService.updateBooking.mockResolvedValue(mockResponse)

      const result = await BookingService.cancelBooking('booking_123', 'user_123')
      expect(result).toEqual(mockResponse.data)
      expect(apiService.updateBooking).toHaveBeenCalled()
    })
  })
})