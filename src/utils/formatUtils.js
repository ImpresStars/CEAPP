export const formatCurrency = (amount) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  } catch (error) {
    console.error('Error formatting currency:', error)
    return `$${amount}`
  }
}

export const formatPhoneNumber = (phone) => {
  try {
    const cleaned = ('' + phone).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return phone
  } catch (error) {
    console.error('Error formatting phone number:', error)
    return phone
  }
}

export const formatAddress = (address) => {
  if (!address) return ''
  
  try {
    const parts = [
      address.street,
      address.city,
      address.state,
      address.zipCode
    ].filter(Boolean)
    
    return parts.join(', ')
  } catch (error) {
    console.error('Error formatting address:', error)
    return ''
  }
}