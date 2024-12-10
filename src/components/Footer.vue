<template>
  <footer class="bg-gray-100 mt-auto">
    <div class="container mx-auto px-6 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Cleaning EDGE</h3>
          <p class="text-gray-600">Professional cleaning services for your home and business</p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <nav class="flex flex-col space-y-2">
            <router-link 
              v-for="link in quickLinks" 
              :key="link.to" 
              :to="link.to"
              class="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {{ link.text }}
            </router-link>
          </nav>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Portals</h3>
          <nav class="flex flex-col space-y-2">
            <router-link 
              to="/login" 
              class="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Client Portal
            </router-link>
            <router-link 
              to="/worker/login" 
              class="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Worker Portal
            </router-link>
            <router-link 
              to="/management/login" 
              class="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Management Portal
            </router-link>
          </nav>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Connect With Us</h3>
          <div class="flex space-x-4">
            <a 
              href="https://facebook.com/cleaningedge" 
              target="_blank"
              class="text-gray-600 hover:text-blue-600"
            >
              <i class="fab fa-facebook text-xl"></i>
            </a>
            <a 
              href="https://instagram.com/cleaningedge" 
              target="_blank"
              class="text-gray-600 hover:text-blue-600"
            >
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a 
              href="https://linkedin.com/company/cleaningedge" 
              target="_blank"
              class="text-gray-600 hover:text-blue-600"
            >
              <i class="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-200 mt-8 pt-8 text-center">
        <p class="text-gray-600">© {{ currentYear }} Cleaning EDGE. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const quickLinks = [
      { to: '/', text: 'Home' },
      { to: '/services', text: 'Services' },
      { to: '/about', text: 'About' },
      { to: '/contact', text: 'Contact' }
    ]

    const currentYear = computed(() => new Date().getFullYear())

    return {
      quickLinks,
      currentYear
    }
  }
}
</script>