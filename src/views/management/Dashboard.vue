<template>
  <div class="min-h-screen bg-gray-100">
    <template v-if="isAuthenticated">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-2xl font-bold text-gray-900">Management Dashboard</h1>
              </div>
              <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <router-link
                  v-for="link in navigationLinks"
                  :key="link.path"
                  :to="link.path"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  :class="{ 'border-blue-500 text-gray-900': $route.path === link.path }"
                >
                  {{ link.name }}
                </router-link>
              </nav>
            </div>
            <div class="flex items-center">
              <button
                @click="handleLogout"
                :disabled="isLoggingOut"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-view></router-view>
      </main>
    </template>
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center py-12">
        <p class="text-red-600 mb-4">Please log in to access the management dashboard.</p>
        <button 
          @click="redirectToLogin" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'ManagementDashboard',
  setup() {
    const store = useStore()
    const router = useRouter()
    const isLoggingOut = ref(false)

    const navigationLinks = [
      { path: '/management', name: 'Overview' },
      { path: '/management/workers', name: 'Workers' },
      { path: '/management/clients', name: 'Clients' },
      { path: '/management/bookings', name: 'Bookings' },
      { path: '/management/reports', name: 'Reports' },
      { path: '/management/database', name: 'Database' },
      { path: '/management/settings', name: 'Settings' }
    ]

    const isAuthenticated = computed(() => store.getters['management/isAuthenticated'])

    const handleLogout = async () => {
      if (isLoggingOut.value) return

      isLoggingOut.value = true
      try {
        const result = await store.dispatch('management/logout')
        if (result.success) {
          await router.push('/management/login')
        }
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        isLoggingOut.value = false
      }
    }

    const redirectToLogin = () => {
      router.push('/management/login')
    }

    onMounted(() => {
      if (!store.dispatch('management/checkAuth')) {
        redirectToLogin()
      }
    })

    return {
      isAuthenticated,
      isLoggingOut,
      navigationLinks,
      handleLogout,
      redirectToLogin
    }
  }
}
</script>