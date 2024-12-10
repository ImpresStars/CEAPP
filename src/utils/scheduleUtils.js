export const getAvailableTimeSlots = (date, duration = 1) => {
  const slots = []
  const startHour = 8 // 8 AM
  const endHour = 18 // 6 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      time: `${hour}:00`,
      available: true,
      duration
    })
  }
  
  return slots
}

export const isTimeSlotAvailable = (slot, bookings = []) => {
  const slotStart = new Date(slot.date)
  const slotEnd = new Date(slotStart.getTime() + (slot.duration * 60 * 60 * 1000))
  
  return !bookings.some(booking => {
    const bookingStart = new Date(booking.date)
    const bookingEnd = new Date(bookingStart.getTime() + (booking.duration * 60 * 60 * 1000))
    
    return (
      (slotStart >= bookingStart && slotStart < bookingEnd) ||
      (slotEnd > bookingStart && slotEnd <= bookingEnd)
    )
  })
}

export const getNextAvailableSlot = (date, bookings = [], duration = 1) => {
  const slots = getAvailableTimeSlots(date, duration)
  return slots.find(slot => isTimeSlotAvailable(slot, bookings))
}

export const formatTimeSlot = (slot) => {
  const time = new Date(slot.date)
  return {
    date: time.toLocaleDateString(),
    time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    duration: `${slot.duration} hour${slot.duration !== 1 ? 's' : ''}`
  }
}