import { StatusCodes } from 'http-status-codes'
import { showErrorNotification } from '../../utils/notificationUtils'

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message)
    this.status = status
    this.code = code
    this.name = 'ApiError'
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response

    switch (status) {
      case StatusCodes.BAD_REQUEST:
        return new ApiError(
          data.message || 'Invalid request',
          status,
          'BAD_REQUEST'
        )

      case StatusCodes.UNAUTHORIZED:
        return new ApiError(
          'Please log in to continue',
          status,
          'UNAUTHORIZED'
        )

      case StatusCodes.FORBIDDEN:
        return new ApiError(
          'You do not have permission to perform this action',
          status,
          'FORBIDDEN'
        )

      case StatusCodes.NOT_FOUND:
        return new ApiError(
          data.message || 'Resource not found',
          status,
          'NOT_FOUND'
        )

      case StatusCodes.CONFLICT:
        return new ApiError(
          data.message || 'Resource conflict',
          status,
          'CONFLICT'
        )

      case StatusCodes.UNPROCESSABLE_ENTITY:
        return new ApiError(
          data.message || 'Validation error',
          status,
          'VALIDATION_ERROR'
        )

      case StatusCodes.TOO_MANY_REQUESTS:
        return new ApiError(
          'Too many requests. Please try again later.',
          status,
          'RATE_LIMIT'
        )

      default:
        return new ApiError(
          'An unexpected error occurred',
          status,
          'SERVER_ERROR'
        )
    }
  }

  if (error.request) {
    return new ApiError(
      'Unable to connect to server',
      0,
      'NETWORK_ERROR'
    )
  }

  return new ApiError(
    error.message || 'An unexpected error occurred',
    0,
    'UNKNOWN_ERROR'
  )
}

export const showApiError = (error) => {
  const apiError = handleApiError(error)
  showErrorNotification(apiError.message)
  return apiError
}