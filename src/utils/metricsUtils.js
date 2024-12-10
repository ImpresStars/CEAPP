export const calculateBookingMetrics = (bookings = []) => {
  const metrics = {
    total: bookings.length,
    completed: 0,
    cancelled: 0,
    pending: 0,
    totalRevenue: 0,
    averageRating: 0
  }

  const ratings = []

  bookings.forEach(booking => {
    switch (booking.status) {
      case 'Completed':
        metrics.completed++
        metrics.totalRevenue += booking.total || 0
        if (booking.rating) ratings.push(booking.rating)
        break
      case 'Cancelled':
        metrics.cancelled++
        break
      case 'Pending':
        metrics.pending++
        break
    }
  })

  metrics.averageRating = ratings.length ? 
    ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 
    0

  metrics.completionRate = metrics.total ? 
    (metrics.completed / metrics.total) * 100 : 
    0

  metrics.cancellationRate = metrics.total ? 
    (metrics.cancelled / metrics.total) * 100 : 
    0

  return metrics
}

export const calculateWorkerMetrics = (worker = {}) => {
  const bookings = worker.bookings || []
  const reviews = worker.reviews || []

  return {
    totalBookings: bookings.length,
    completedBookings: bookings.filter(b => b.status === 'Completed').length,
    averageRating: reviews.length ? 
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length :
      0,
    totalEarnings: bookings.reduce((sum, booking) => {
      return booking.status === 'Completed' ? sum + (booking.workerEarnings || 0) : sum
    }, 0),
    efficiency: calculateWorkerEfficiency(bookings),
    certifications: worker.certifications?.length || 0
  }
}

export const calculateClientMetrics = (client = {}) => {
  const bookings = client.bookings || []

  return {
    totalBookings: bookings.length,
    totalSpent: bookings.reduce((sum, booking) => {
      return booking.status === 'Completed' ? sum + (booking.total || 0) : sum
    }, 0),
    averageBookingValue: bookings.length ? 
      bookings.reduce((sum, booking) => sum + (booking.total || 0), 0) / bookings.length :
      0,
    loyaltyPoints: calculateLoyaltyPoints(bookings),
    tier: getClientTier(client),
    addresses: client.addresses?.length || 0,
    vehicles: client.vehicles?.length || 0
  }
}

const calculateWorkerEfficiency = (bookings = []) => {
  const completedBookings = bookings.filter(b => b.status === 'Completed')
  if (!completedBookings.length) return 0

  const efficiency = completedBookings.reduce((sum, booking) => {
    const estimatedDuration = booking.estimatedDuration || 0
    const actualDuration = booking.actualDuration || estimatedDuration
    return sum + (estimatedDuration / actualDuration)
  }, 0)

  return (efficiency / completedBookings.length) * 100
}

const calculateLoyaltyPoints = (bookings = []) => {
  return bookings.reduce((points, booking) => {
    if (booking.status !== 'Completed') return points
    
    const basePoints = 100
    const bonusPoints = booking.total >= 200 ? 50 : 0
    const referralPoints = booking.referral ? 200 : 0
    
    return points + basePoints + bonusPoints + referralPoints
  }, 0)
}

const getClientTier = (client) => {
  const totalSpent = client.bookings?.reduce((sum, booking) => {
    return booking.status === 'Completed' ? sum + (booking.total || 0) : sum
  }, 0) || 0

  if (totalSpent >= 5000) return 'Platinum'
  if (totalSpent >= 2000) return 'Gold'
  if (totalSpent >= 500) return 'Silver'
  return 'Bronze'
}