import { useToast } from 'vue-toastification'

export function useNotification() {
  const toast = useToast()

  return {
    showSuccess: (message, options = {}) => {
      toast.success(message, options)
    },
    showError: (message, options = {}) => {
      toast.error(message || 'An error occurred', options)
    },
    showWarning: (message, options = {}) => {
      toast.warning(message, options)
    },
    showInfo: (message, options = {}) => {
      toast.info(message, options)
    },
    dismiss: (id) => {
      toast.dismiss(id)
    },
    dismissAll: () => {
      toast.clear()
    }
  }
}