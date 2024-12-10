export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  return phoneRegex.test(phone)
}

export const validatePassword = (password) => {
  if (!password) return false
  return password.length >= 8
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== ''
}

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength
}

export const validateMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength
}