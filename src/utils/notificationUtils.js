import { useToast } from 'vue-toastification'

let toast = null

try {
  toast = useToast()
} catch (error) {
  console.warn('Toast not available:', error)
}

export const showNotification = (message, type = 'default', options = {}) => {
  if (!toast) return

  const defaultOptions = {
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true
  }

  const finalOptions = { ...defaultOptions, ...options }

  switch (type) {
    case 'success':
      toast.success(message, finalOptions)
      break
    case 'error':
      toast.error(message, finalOptions)
      break
    case 'warning':
      toast.warning(message, finalOptions)
      break
    case 'info':
      toast.info(message, finalOptions)
      break
    default:
      toast(message, finalOptions)
  }
}

export const showSuccessNotification = (message, options = {}) => {
  showNotification(message, 'success', options)
}

export const showErrorNotification = (message, options = {}) => {
  showNotification(message || 'An error occurred', 'error', options)
}

export const showWarningNotification = (message, options = {}) => {
  showNotification(message, 'warning', options)
}

export const showInfoNotification = (message, options = {}) => {
  showNotification(message, 'info', options)
}