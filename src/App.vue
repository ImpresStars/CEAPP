<template>
  <div class="app min-h-screen flex flex-col">
    <template v-if="!isInDashboard">
      <Header 
        :is-logged-in="isAuthenticated" 
        :user-type="userType"
        @logout="handleLogout" 
      />
      <main class="flex-grow">
        <router-view></router-view>
      </main>
      <Footer />
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
    <LoadingOverlay />
    <ErrorBoundary />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoadingOverlay,
    ErrorBoundary
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const userType = computed(() => 'client')
    const isInDashboard = computed(() => route.path.startsWith('/dashboard'))

    const handleLogout = async () => {
      const result = await store.dispatch('auth/logout')
      if (result.success) {
        await router.push('/login')
      }
    }

    return {
      isAuthenticated,
      userType,
      isInDashboard,
      handleLogout
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>