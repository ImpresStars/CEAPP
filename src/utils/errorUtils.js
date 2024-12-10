export const handleError = (error, defaultMessage = 'An unexpected error occurred') => {
  console.error('Error:', error)
  
  if (error.response) {
    // Server responded with error
    return error.response.data?.message || error.response.data?.error || defaultMessage
  }
  
  if (error.request) {
    // Request made but no response
    return 'Unable to connect to server. Please check your internet connection.'
  }
  
  // Other errors
  return error.message || defaultMessage
}

export const createErrorResponse = (error, defaultMessage = 'An unexpected error occurred') => {
  return {
    success: false,
    error: handleError(error, defaultMessage)
  }
}

export const isNetworkError = (error) => {
  return !error.response && error.request
}

export const isValidationError = (error) => {
  return error.response?.status === 422
}

export const isAuthenticationError = (error) => {
  return error.response?.status === 401
}

export const isAuthorizationError = (error) => {
  return error.response?.status === 403
}