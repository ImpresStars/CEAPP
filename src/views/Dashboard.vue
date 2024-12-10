<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-2xl font-bold text-gray-900">Client Dashboard</h1>
            </div>
            <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                v-for="link in navigationLinks"
                :key="link.to"
                :to="link.to"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{ 'border-blue-500 text-gray-900': $route.path === link.to }"
              >
                {{ link.name }}
              </router-link>
            </nav>
          </div>
          <div class="flex items-center">
            <span class="mr-4">Welcome, {{ user?.firstName }}</span>
            <button
              @click="handleLogout"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Dashboard',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const user = computed(() => store.getters['auth/currentUser'])

    const navigationLinks = [
      { to: '/dashboard', name: 'Home' },
      { to: '/dashboard/bookings', name: 'Bookings' },
      { to: '/dashboard/profile', name: 'Profile' },
      { to: '/dashboard/addresses', name: 'Addresses' },
      { to: '/dashboard/vehicles', name: 'Vehicles' }
    ]

    const handleLogout = async () => {
      const result = await store.dispatch('auth/logout')
      if (result.success) {
        router.push('/login')
      }
    }

    return {
      user,
      navigationLinks,
      handleLogout
    }
  }
}
</script>