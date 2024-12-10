import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showErrorNotification } from '../utils/notificationUtils'

export function useAuth() {
  const router = useRouter()
  const store = useStore()
  const isLoading = ref(false)

  const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
  const currentUser = computed(() => store.getters['auth/currentUser'])
  const authError = computed(() => store.getters['auth/error'])

  const login = async (credentials) => {
    if (isLoading.value) return { success: false, error: 'Already processing request' }

    isLoading.value = true
    try {
      const result = await store.dispatch('auth/login', credentials)
      if (result.success) {
        await router.push('/dashboard')
      }
      return result
    } catch (error) {
      console.error('Login error:', error)
      showErrorNotification(error.message)
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    if (isLoading.value) return { success: false, error: 'Already processing request' }

    isLoading.value = true
    try {
      const result = await store.dispatch('auth/logout')
      if (result.success) {
        await router.push('/login')
      }
      return result
    } catch (error) {
      console.error('Logout error:', error)
      showErrorNotification('Error during logout')
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isAuthenticated,
    currentUser,
    authError,
    login,
    logout
  }
}