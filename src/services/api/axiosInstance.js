import axios from 'axios'
import axiosRetry from 'axios-retry'
import { StatusCodes } from 'http-status-codes'
import { useStore } from 'vuex'
import { showErrorNotification } from '../../utils/notificationUtils'
import { trackError } from '../../utils/analyticsUtils'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Configure retry behavior
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           error.response?.status === StatusCodes.TOO_MANY_REQUESTS
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const store = useStore()
    const token = store.getters['auth/token']
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const store = useStore()
    const originalRequest = error.config

    // Handle token expiration
    if (error.response?.status === StatusCodes.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await store.dispatch('auth/refreshToken')
        const token = store.getters['auth/token']
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        await store.dispatch('auth/logout')
        showErrorNotification('Your session has expired. Please log in again.')
        return Promise.reject(refreshError)
      }
    }

    // Handle rate limiting
    if (error.response?.status === StatusCodes.TOO_MANY_REQUESTS) {
      const retryAfter = error.response.headers['retry-after'] || 60
      showErrorNotification(`Too many requests. Please try again in ${retryAfter} seconds.`)
    }

    // Track error for analytics
    trackError(error, {
      url: originalRequest?.url,
      method: originalRequest?.method,
      status: error.response?.status
    })

    return Promise.reject(error)
  }
)

export default axiosInstance