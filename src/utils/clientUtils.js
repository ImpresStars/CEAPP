export const calculateLoyaltyPoints = (bookings = []) => {
  return bookings.reduce((points, booking) => {
    if (booking.status !== 'Completed') return points
    
    const basePoints = 100
    const bonusPoints = booking.total >= 200 ? 50 : 0
    const referralPoints = booking.referral ? 200 : 0
    
    return points + basePoints + bonusPoints + referralPoints
  }, 0)
}

export const getClientTier = (totalSpent = 0, completedBookings = 0) => {
  if (totalSpent >= 5000 && completedBookings >= 20) return 'Platinum'
  if (totalSpent >= 2000 && completedBookings >= 10) return 'Gold'
  if (totalSpent >= 500 && completedBookings >= 5) return 'Silver'
  return 'Bronze'
}

export const calculateDiscount = (clientTier, bookingTotal) => {
  const discounts = {
    Platinum: 0.15,
    Gold: 0.10,
    Silver: 0.05,
    Bronze: 0
  }
  
  const discountRate = discounts[clientTier] || 0
  return bookingTotal * discountRate
}

export const getAvailableServices = (clientType = 'Basic') => {
  const services = {
    Basic: [
      'House Cleaning',
      'Vehicle Detailing',
      'Carpet Cleaning'
    ],
    Commercial: [
      'House Cleaning',
      'Commercial Cleaning',
      'Vehicle Detailing',
      'Carpet Cleaning',
      'Post-Construction'
    ]
  }
  
  return services[clientType] || services.Basic
}