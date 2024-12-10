import { storage } from '../storage'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const scheduleService = {
  async getAvailableSlots(date, serviceType) {
    await delay(500)
    try {
      const bookings = storage.get('bookings') || []
      const workers = storage.get('workers') || []
      
      // Get all bookings for the specified date
      const dateBookings = bookings.filter(booking => 
        new Date(booking.date).toDateString() === new Date(date).toDateString()
      )

      // Get available workers for the service type
      const availableWorkers = workers.filter(worker => 
        worker.certifications.includes(serviceType) &&
        worker.status === 'Active'
      )

      // Calculate available time slots
      const slots = []
      const startHour = 8 // 8 AM
      const endHour = 18 // 6 PM

      for (let hour = startHour; hour < endHour; hour++) {
        const availableWorkersCount = availableWorkers.length - dateBookings.filter(booking => 
          new Date(booking.date).getHours() === hour
        ).length

        if (availableWorkersCount > 0) {
          slots.push({
            time: `${hour}:00`,
            availableWorkers: availableWorkersCount
          })
        }
      }

      return { success: true, data: slots }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async checkSlotAvailability(date, serviceType) {
    await delay(500)
    try {
      const slots = await this.getAvailableSlots(date, serviceType)
      if (!slots.success) throw new Error(slots.error)

      return {
        success: true,
        data: {
          available: slots.data.length > 0,
          nextAvailable: slots.data[0]?.time
        }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}