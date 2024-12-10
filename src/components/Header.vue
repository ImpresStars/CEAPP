<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold text-blue-600">
          Cleaning EDGE
        </router-link>

        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/services" 
            class="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Services
          </router-link>
          <router-link 
            to="/about" 
            class="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </router-link>
          <router-link 
            to="/contact" 
            class="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Contact
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <template v-if="isLoggedIn">
            <router-link 
              :to="getDashboardLink" 
              class="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </router-link>
            <button 
              @click="$emit('logout')" 
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link 
              to="/login" 
              class="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Login
            </router-link>
            <router-link 
              to="/signup"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </router-link>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Header',
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    },
    userType: {
      type: String,
      default: null
    }
  },
  emits: ['logout'],
  setup(props) {
    const getDashboardLink = computed(() => {
      switch (props.userType) {
        case 'client':
          return '/dashboard'
        case 'worker':
          return '/worker-dashboard'
        case 'management':
          return '/management'
        default:
          return '/dashboard'
      }
    })

    return {
      getDashboardLink
    }
  }
}
</script>