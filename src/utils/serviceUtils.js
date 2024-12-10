import { calculateBookingTotal } from './bookingUtils'

export const getServicePrice = (serviceType, duration = 1) => {
  return calculateBookingTotal(serviceType, duration)
}

export const getServiceRequirements = (serviceType) => {
  const requirements = {
    'House Cleaning': ['General Cleaning Certification'],
    'Commercial Cleaning': ['Commercial Certification', 'Equipment Operation'],
    'Vehicle Detailing': ['Vehicle Detailing Certification'],
    'Carpet Cleaning': ['Carpet Cleaning Certification']
  }
  
  return requirements[serviceType] || []
}

export const getServiceDuration = (serviceType, size = 'medium') => {
  const baseDurations = {
    'House Cleaning': 3,
    'Commercial Cleaning': 4,
    'Vehicle Detailing': 2,
    'Carpet Cleaning': 2
  }

  const sizeMultipliers = {
    small: 0.75,
    medium: 1,
    large: 1.5
  }

  const baseDuration = baseDurations[serviceType] || 2
  const multiplier = sizeMultipliers[size] || 1
  
  return Math.ceil(baseDuration * multiplier)
}

export const getServiceDescription = (serviceType) => {
  const descriptions = {
    'House Cleaning': 'Professional cleaning service for residential properties',
    'Commercial Cleaning': 'Comprehensive cleaning solutions for business premises',
    'Vehicle Detailing': 'Complete interior and exterior vehicle cleaning service',
    'Carpet Cleaning': 'Deep cleaning and sanitization of carpets and rugs'
  }
  
  return descriptions[serviceType] || 'Professional cleaning service'
}