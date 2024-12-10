<template>
  <div class="worker-dashboard">
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Worker Dashboard</h1>
        <nav class="flex items-center space-x-4">
          <router-link to="/worker-dashboard" class="hover:text-blue-200">Available Jobs</router-link>
          <router-link to="/worker-dashboard/profile" class="hover:text-blue-200">Profile</router-link>
          <router-link to="/worker-dashboard/trainings" class="hover:text-blue-200">Trainings</router-link>
          <router-link to="/worker-dashboard/history" class="hover:text-blue-200">Service History</router-link>
          <router-link to="/worker-dashboard/paystubs" class="hover:text-blue-200">Paystubs & Taxes</router-link>
          <button @click="handleLogout" class="hover:text-blue-200">Logout</button>
        </nav>
      </div>
    </header>
    <main class="container mx-auto mt-8 p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { apiService } from '../services/api'

export default {
  name: 'WorkerDashboard',
  setup() {
    const router = useRouter()

    const handleLogout = async () => {
      try {
        await apiService.workerLogout()
        router.push('/worker-login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    return {
      handleLogout
    }
  }
}
</script>