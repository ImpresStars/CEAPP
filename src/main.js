import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'
import { storage } from './services/storage'
import { TEST_CREDENTIALS } from './constants/credentials'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'vue-toastification/dist/index.css'
import './index.css'

// Initialize storage and mock data
const initializeApp = () => {
  // Check if storage is available
  if (!storage.isAvailable()) {
    console.error('LocalStorage is not available. Some features may not work properly.')
  }

  // Initialize mock data if not exists
  if (!storage.get('users')) {
    storage.set('users', [TEST_CREDENTIALS.client.mockUser])
  }

  const app = createApp(App)
  const pinia = createPinia()

  const toastOptions = {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
  }

  app.use(pinia)
  app.use(store)
  app.use(router)
  app.use(Toast, toastOptions)

  // Initialize store modules
  return Promise.all([
    store.dispatch('auth/initialize'),
    store.dispatch('worker/initialize'),
    store.dispatch('management/initialize')
  ]).then(() => {
    app.mount('#app')
  }).catch(error => {
    console.error('Failed to initialize app:', error)
  })
}

initializeApp()