export const validateVehicle = (vehicle) => {
  const required = ['make', 'model', 'year', 'color', 'type']
  return required.every(field => vehicle[field]?.toString().trim())
}

export const formatVehicleForDisplay = (vehicle) => {
  if (!vehicle) return ''
  return `${vehicle.year} ${vehicle.make} ${vehicle.model} - ${vehicle.color}`
}

export const getVehicleType = (type) => {
  const types = {
    sedan: 'Sedan',
    suv: 'SUV',
    truck: 'Truck',
    van: 'Van',
    motorcycle: 'Motorcycle'
  }
  return types[type?.toLowerCase()] || type
}

export const calculateVehicleServicePrice = (vehicle, serviceType) => {
  const basePrice = 100
  const typeMultipliers = {
    sedan: 1,
    suv: 1.3,
    truck: 1.5,
    van: 1.5,
    motorcycle: 0.8
  }
  
  const multiplier = typeMultipliers[vehicle.type?.toLowerCase()] || 1
  return basePrice * multiplier
}