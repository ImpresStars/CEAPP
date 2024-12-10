<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Assign Worker to Booking
      </h3>
    </template>
    <template #body>
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-gray-500">Booking Details</h4>
          <p class="mt-1">{{ booking.serviceType }}</p>
          <p class="text-sm text-gray-500">{{ formatDate(booking.date) }}</p>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-500 mb-2">Available Workers</h4>
          <div class="space-y-2">
            <div
              v-for="worker in availableWorkers"
              :key="worker.id"
              class="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
              @click="selectWorker(worker)"
            >
              <div>
                <p class="font-medium">{{ worker.name }}</p>
                <p class="text-sm text-gray-500">Level: {{ worker.level }}</p>
              </div>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="cert in worker.certifications"
                  :key="cert"
                  class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                >
                  {{ cert }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { ref } from 'vue'
import BaseModal from '../BaseModal.vue'

export default {
  name: 'WorkerAssignmentModal',
  components: {
    BaseModal
  },
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  emits: ['assign', 'close'],
  setup(props, { emit }) {
    const availableWorkers = ref([
      {
        id: 'W001',
        name: 'Mike Johnson',
        level: 'Expert',
        certifications: ['General Cleaning', 'Residential', 'Commercial']
      },
      {
        id: 'W002',
        name: 'Sarah Wilson',
        level: 'Senior',
        certifications: ['General Cleaning', 'Residential']
      }
    ])

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString()
    }

    const selectWorker = (worker) => {
      emit('assign', worker)
    }

    return {
      availableWorkers,
      formatDate,
      selectWorker
    }
  }
}
</script>