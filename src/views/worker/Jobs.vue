<template>
  <div class="worker-jobs container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Available Jobs</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="job in availableJobs" :key="job.id" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-2">{{ job.serviceType }}</h2>
        <p><strong>Date:</strong> {{ formatDate(job.date) }}</p>
        <p><strong>Location:</strong> {{ job.location }}</p>
        <p><strong>Duration:</strong> {{ job.estimatedDuration }} hours</p>
        <p class="mt-2"><strong>Requirements:</strong></p>
        <ul class="list-disc list-inside mb-4">
          <li v-for="req in job.requirements" :key="req">{{ req }}</li>
        </ul>
        <BaseButton @click="acceptJob(job.id)" class="w-full">Accept Job</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseButton from '../../components/BaseButton.vue'

export default {
  name: 'WorkerJobs',
  components: {
    BaseButton
  },
  setup() {
    const availableJobs = ref([
      {
        id: 1,
        serviceType: 'House Cleaning',
        date: new Date('2023-06-15T10:00:00'),
        location: '123 Main St, City',
        estimatedDuration: 3,
        requirements: ['General Cleaning Certification', 'Residential Experience']
      },
      {
        id: 2,
        serviceType: 'Commercial Cleaning',
        date: new Date('2023-06-16T09:00:00'),
        location: '456 Business Ave, City',
        estimatedDuration: 5,
        requirements: ['Commercial Certification', 'Equipment Operation']
      }
    ])

    const formatDate = (date) => {
      return new Date(date).toLocaleString()
    }

    const acceptJob = (jobId) => {
      console.log('Accepting job:', jobId)
      // Implement job acceptance logic
    }

    return {
      availableJobs,
      formatDate,
      acceptJob
    }
  }
}
</script>