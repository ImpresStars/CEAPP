import { formatCurrency } from './formatUtils'
import { formatDate } from './dateUtils'

export const calculateBookingTotal = (serviceType, duration, extras = []) => {
  const baseRates = {
    'House Cleaning': 50,
    'Commercial Cleaning': 75,
    'Vehicle Detailing': 100,
    'Carpet Cleaning': 60
  }

  const baseRate = baseRates[serviceType] || 50
  const extrasTotal = extras.reduce((total, extra) => total + extra.price, 0)
  
  return baseRate * duration + extrasTotal
}

export const getBookingStatusClass = (status) => {
  const classes = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Confirmed': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-indigo-100 text-indigo-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

export const formatBookingDetails = (booking) => {
  if (!booking) return null

  return {
    id: booking.id,
    serviceType: booking.serviceType,
    date: formatDate(booking.date),
    status: booking.status,
    total: formatCurrency(booking.total),
    duration: `${booking.duration} hour${booking.duration !== 1 ? 's' : ''}`,
    notes: booking.notes || 'No special instructions'
  }
}

export const canCancelBooking = (booking) => {
  if (!booking) return false
  
  const cancellableStatuses = ['Pending', 'Confirmed']
  if (!cancellableStatuses.includes(booking.status)) return false
  
  const bookingDate = new Date(booking.date)
  const now = new Date()
  const hoursDiff = (bookingDate - now) / (1000 * 60 * 60)
  
  return hoursDiff >= 24 // Can cancel if more than 24 hours before booking
}