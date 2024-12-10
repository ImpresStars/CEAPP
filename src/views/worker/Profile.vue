<template>
  <div class="worker-profile container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Worker Profile</h1>
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 class="text-xl font-semibold mb-4">Personal Information</h2>
          <p><strong>Worker ID:</strong> {{ profile.id }}</p>
          <p><strong>Name:</strong> {{ profile.name }}</p>
          <p><strong>Level:</strong> {{ profile.level }}</p>
          <p><strong>Driver Authorization:</strong> {{ profile.driverAuthorization ? 'Yes' : 'No' }}</p>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-4">Certifications</h2>
          <ul class="list-disc list-inside">
            <li v-for="cert in profile.certifications" :key="cert" class="mb-2">
              {{ cert }}
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-4">Current Trainings</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="training in profile.trainings" :key="training.id" class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-semibold">{{ training.name }}</h3>
            <p class="text-sm text-gray-600">Completed: {{ formatDate(training.completed) }}</p>
            <p class="text-sm text-gray-600">Expires: {{ formatDate(training.expires) }}</p>
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
  name: 'WorkerProfile',
  setup() {
    const profile = ref({})

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    onMounted(async () => {
      try {
        const result = await apiService.workerLogin('W001', 'worker123')
        if (!result.error) {
          profile.value = result.data
        }
      } catch (error) {
        console.error('Error fetching worker profile:', error)
      }
    })

    return {
      profile,
      formatDate
    }
  }
}
</script>