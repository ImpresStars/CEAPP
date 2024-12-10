export const validateAddress = (address) => {
  const required = ['street', 'city', 'state', 'zipCode']
  return required.every(field => address[field]?.trim())
}

export const formatAddressForDisplay = (address) => {
  if (!address) return ''
  
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode
  ].filter(Boolean)
  
  return parts.join(', ')
}

export const formatAddressForApi = (address) => {
  return {
    street: address.street?.trim(),
    city: address.city?.trim(),
    state: address.state?.trim(),
    zipCode: address.zipCode?.trim(),
    name: address.name?.trim() || 'Default',
    type: address.type || 'home'
  }
}

export const getAddressType = (address) => {
  const types = {
    home: 'Home Address',
    work: 'Work Address',
    other: 'Other Address'
  }
  return types[address.type] || types.home
}