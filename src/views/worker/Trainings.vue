<template>
  <div class="worker-trainings container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Training & Certifications</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-semibold mb-4">Current Certifications</h2>
        <div class="bg-white rounded-lg shadow-md p-6">
          <div v-for="cert in certifications" :key="cert" class="mb-4 p-4 bg-blue-50 rounded-lg">
            <div class="flex items-center">
              <i class="fas fa-certificate text-blue-500 mr-3"></i>
              <span class="font-semibold">{{ cert }}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-4">Required Trainings</h2>
        <div class="bg-white rounded-lg shadow-md p-6">
          <div v-for="training in trainings" :key="training.id" 
               class="mb-4 p-4 rounded-lg"
               :class="getTrainingStatusClass(training)">
            <h3 class="font-semibold">{{ training.name }}</h3>
            <p class="text-sm">Completed: {{ formatDate(training.completed) }}</p>
            <p class="text-sm">Expires: {{ formatDate(training.expires) }}</p>
            <div class="mt-2">
              <BaseButton v-if="isTrainingExpired(training)" 
                         @click="renewTraining(training.id)"
                         color="blue">
                Renew Training
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import BaseButton from '../../components/BaseButton.vue'
import { apiService } from '../../services/api'

export default {
  name: 'WorkerTrainings',
  components: {
    BaseButton
  },
  setup() {
    const certifications = ref([])
    const trainings = ref([])

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    const isTrainingExpired = (training) => {
      return new Date(training.expires) < new Date()
    }

    const getTrainingStatusClass = (training) => {
      if (isTrainingExpired(training)) {
        return 'bg-red-50'
      }
      const expirationDate = new Date(training.expires)
      const monthUntilExpiration = (expirationDate - new Date()) / (1000 * 60 * 60 * 24 * 30)
      return monthUntilExpiration <= 1 ? 'bg-yellow-50' : 'bg-green-50'
    }

    const renewTraining = async (trainingId) => {
      try {
        // Implement training renewal logic
        console.log('Renewing training:', trainingId)
      } catch (error) {
        console.error('Error renewing training:', error)
      }
    }

    onMounted(async () => {
      try {
        const result = await apiService.workerLogin('W001', 'worker123')
        if (!result.error) {
          certifications.value = result.data.certifications
          trainings.value = result.data.trainings
        }
      } catch (error) {
        console.error('Error fetching worker data:', error)
      }
    })

    return {
      certifications,
      trainings,
      formatDate,
      isTrainingExpired,
      getTrainingStatusClass,
      renewTraining
    }
  }
}
</script>