export const validatePaymentMethod = (paymentMethod) => {
  const required = ['cardNumber', 'expirationMonth', 'expirationYear', 'cvv']
  if (!required.every(field => paymentMethod[field])) return false
  
  const cardNumber = paymentMethod.cardNumber.replace(/\D/g, '')
  if (cardNumber.length < 13 || cardNumber.length > 19) return false
  
  const now = new Date()
  const expYear = parseInt(paymentMethod.expirationYear)
  const expMonth = parseInt(paymentMethod.expirationMonth)
  
  if (expYear < now.getFullYear() || 
      (expYear === now.getFullYear() && expMonth < (now.getMonth() + 1))) {
    return false
  }
  
  return true
}

export const formatCardNumber = (number) => {
  const cleaned = number.replace(/\D/g, '')
  const groups = cleaned.match(/(\d{1,4})/g)
  return groups ? groups.join(' ') : cleaned
}

export const getCardType = (number) => {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/
  }
  
  const cleaned = number.replace(/\D/g, '')
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleaned)) return type
  }
  
  return 'unknown'
}

export const maskCardNumber = (number) => {
  const cleaned = number.replace(/\D/g, '')
  return `•••• •••• •••• ${cleaned.slice(-4)}`
}