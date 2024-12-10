import { useStore } from 'vuex'
import { handleError } from '../../utils/errorUtils'
import { showErrorNotification } from '../../utils/notificationUtils'
import { trackError } from '../../utils/analyticsUtils'

export const setupInterceptors = (axios) => {
  // Request interceptor
  axios.interceptors.request.use(
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
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const store = useStore()
      const originalRequest = error.config

      // Handle token expiration
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          await store.dispatch('auth/refreshToken')
          const token = store.getters['auth/token']
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axios(originalRequest)
        } catch (refreshError) {
          await store.dispatch('auth/logout')
          return Promise.reject(refreshError)
        }
      }

      // Handle other errors
      const errorMessage = handleError(error)
      showErrorNotification(errorMessage)
      trackError(error, { url: originalRequest.url })

      return Promise.reject(error)
    }
  )
}