export const calculateWorkerEarnings = (bookings = []) => {
  return bookings.reduce((total, booking) => {
    if (booking.status !== 'Completed') return total
    
    const baseRate = 25 // Base hourly rate
    const duration = booking.duration || 1
    const bonus = booking.rating >= 4.5 ? 10 : 0 // Bonus for high ratings
    
    return total + (baseRate * duration) + bonus
  }, 0)
}

export const getWorkerLevel = (completedJobs = 0, rating = 0) => {
  if (completedJobs >= 500 && rating >= 4.5) return 'Expert'
  if (completedJobs >= 200 && rating >= 4.0) return 'Senior'
  if (completedJobs >= 50 && rating >= 3.5) return 'Intermediate'
  return 'Junior'
}

export const getRequiredTrainings = (certifications = []) => {
  const allTrainings = {
    'General Cleaning': ['Basic Safety', 'Cleaning Products'],
    'Commercial': ['Commercial Equipment', 'Safety Protocols'],
    'Vehicle Detailing': ['Auto Detailing', 'Paint Protection'],
    'Carpet Cleaning': ['Carpet Care', 'Stain Removal']
  }

  return certifications.reduce((required, cert) => {
    return [...required, ...(allTrainings[cert] || [])]
  }, [])
}

export const calculateEfficiency = (completedJobs = [], period = 30) => {
  const recentJobs = completedJobs.filter(job => {
    const jobDate = new Date(job.date)
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - period)
    return jobDate >= cutoff
  })

  if (!recentJobs.length) return 0

  const totalTime = recentJobs.reduce((sum, job) => sum + (job.actualDuration || 0), 0)
  const expectedTime = recentJobs.reduce((sum, job) => sum + (job.estimatedDuration || 0), 0)

  return expectedTime ? Math.min(100, (expectedTime / totalTime) * 100) : 0
}