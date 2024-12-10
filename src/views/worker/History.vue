<template>
  <div class="worker-history container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Service History</h1>
    <div class="bg-white rounded-lg shadow-md p-6">
      <div v-for="service in serviceHistory" :key="service.id" class="mb-6 p-4 border-b last:border-b-0">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-semibold">{{ service.type }}</h2>
            <p class="text-gray-600">{{ service.client }}</p>
            <p class="text-sm text-gray-500">{{ formatDate(service.date) }}</p>
          </div>
          <span :class="getStatusClass(service.status)">
            {{ service.status }}
          </span>
        </div>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold mb-2">Service Details</h3>
            <ul class="list-disc list-inside">
              <li v-for="(detail, index) in service.details" :key="index">
                {{ detail }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Client Feedback</h3>
            <p v-if="service.feedback">{{ service.feedback }}</p>
            <p v-else class="text-gray-500">No feedback provided</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api'

export default {
  name: 'WorkerHistory',
  setup() {
    const serviceHistory = ref([])

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    const getStatusClass = (status) => {
      const classes = {
        'Completed': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800',
        'In Progress': 'bg-blue-100 text-blue-800'
      }
      return `px-3 py-1 rounded-full text-sm ${classes[status] || 'bg-gray-100 text-gray-800'}`
    }

    onMounted(async () => {
      try {
        const result = await apiService.workerLogin('W001', 'worker123')
        if (!result.error) {
          serviceHistory.value = result.data.serviceHistory
        }
      } catch (error) {
        console.error('Error fetching service history:', error)
      }
    })

    return {
      serviceHistory,
      formatDate,
      getStatusClass
    }
  }
}
</script>