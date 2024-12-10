<template>
  <div class="management-home p-6">
    <!-- Error Display -->
    <div v-if="error" class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {{ error }}
      <button @click="dismissError" class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <span class="sr-only">Dismiss</span>
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else>
      <h2 class="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in dashboardStats" :key="stat.title" 
             class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div :class="['rounded-full p-3', colorClasses[stat.color]]">
              <i :class="['fas', `fa-${stat.icon}`, 'text-white']"></i>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold">{{ stat.title }}</h3>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
              <p class="text-sm text-gray-600">{{ stat.trend }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Bookings -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div v-if="recentBookings.length > 0" class="space-y-4">
            <div v-for="booking in recentBookings" :key="booking.id" 
                 class="flex justify-between items-center border-b pb-4">
              <div>
                <p class="font-medium">{{ booking.serviceType }}</p>
                <p class="text-sm text-gray-600">{{ booking.clientName }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm">{{ formatDate(booking.date) }}</p>
                <span :class="getStatusClass(booking.status)">
                  {{ booking.status }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500 py-4">
            No recent bookings
          </div>
        </div>

        <!-- Worker Activity -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4">Worker Activity</h3>
          <div v-if="workerActivity.length > 0" class="space-y-4">
            <div v-for="activity in workerActivity" :key="activity.id" 
                 class="flex justify-between items-center border-b pb-4">
              <div>
                <p class="font-medium">{{ activity.workerName }}</p>
                <p class="text-sm text-gray-600">{{ activity.action }}</p>
              </div>
              <p class="text-sm text-gray-600">{{ formatDate(activity.timestamp) }}</p>
            </div>
          </div>
          <div v-else class="text-center text-gray-500 py-4">
            No recent worker activity
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ManagementHome',
  setup() {
    const store = useStore()
    const isLoading = ref(true)
    const error = ref(null)
    const recentBookings = ref([])
    const workerActivity = ref([])

    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    }

    const loadDashboardData = async () => {
      isLoading.value = true
      error.value = null

      try {
        // Load workers
        const workersResult = await store.dispatch('workers/fetchWorkers')
        if (!workersResult.success) {
          throw new Error(workersResult.error)
        }
        
        // Load bookings
        const bookingsResult = await store.dispatch('bookings/fetchBookings')
        if (bookingsResult.success) {
          recentBookings.value = bookingsResult.data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
        }

        // Load worker activity
        const activityResult = await store.dispatch('workers/fetchRecentActivity')
        if (activityResult.success) {
          workerActivity.value = activityResult.data
        }

      } catch (err) {
        console.error('Error loading dashboard data:', err)
        error.value = 'Failed to load dashboard data'
      } finally {
        isLoading.value = false
      }
    }

    const dashboardStats = computed(() => {
      const activeWorkers = store.getters['workers/activeWorkers']?.length || 0
      const totalBookings = recentBookings.value.length || 0
      const pendingBookings = recentBookings.value.filter(b => b.status === 'Pending').length || 0
      
      return [
        {
          title: 'Active Workers',
          value: activeWorkers.toString(),
          icon: 'users',
          trend: `${activeWorkers} available`,
          color: 'blue'
        },
        {
          title: 'Total Bookings',
          value: totalBookings.toString(),
          icon: 'calendar',
          trend: `${pendingBookings} pending`,
          color: 'green'
        },
        {
          title: 'Active Clients',
          value: '0',
          icon: 'user-circle',
          trend: 'Last 30 days',
          color: 'indigo'
        },
        {
          title: 'Revenue (MTD)',
          value: '$0.00',
          icon: 'dollar-sign',
          trend: '+0% vs last month',
          color: 'yellow'
        }
      ]
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString()
    }

    const getStatusClass = (status) => {
      const classes = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Confirmed': 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-indigo-100 text-indigo-800',
        'Completed': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800'
      }
      return `px-2 py-1 text-xs rounded-full ${classes[status] || classes['Pending']}`
    }

    const dismissError = () => {
      error.value = null
    }

    onMounted(() => {
      loadDashboardData()
    })

    return {
      isLoading,
      error,
      recentBookings,
      workerActivity,
      dashboardStats,
      colorClasses,
      formatDate,
      getStatusClass,
      dismissError
    }
  }
}
</script>