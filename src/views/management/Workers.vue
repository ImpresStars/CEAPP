<template>
  <div class="workers-management">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Worker Management</h2>
      <button
        @click="showAddWorkerModal = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add New Worker
      </button>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certifications</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="worker in workers" :key="worker.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ worker.name }}</div>
                  <div class="text-sm text-gray-500">ID: {{ worker.id }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ worker.level }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="cert in worker.certifications"
                  :key="cert"
                  class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                >
                  {{ cert }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(worker.status)">
                {{ worker.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="editWorker(worker)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(worker)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <WorkerModal
      v-if="showWorkerModal"
      :worker="selectedWorker"
      @save="saveWorker"
      @close="showWorkerModal = false"
    />

    <ConfirmModal
      v-if="showDeleteModal"
      :message="`Are you sure you want to delete ${selectedWorker?.name}?`"
      @confirm="deleteWorker"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import WorkerModal from '../../components/management/WorkerModal.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'

export default {
  name: 'WorkersManagement',
  components: {
    WorkerModal,
    ConfirmModal
  },
  setup() {
    const workers = ref([
      {
        id: 'W001',
        name: 'Mike Johnson',
        level: 'Expert',
        certifications: ['General Cleaning', 'Residential', 'Commercial'],
        status: 'Active'
      },
      {
        id: 'W002',
        name: 'Sarah Wilson',
        level: 'Senior',
        certifications: ['General Cleaning', 'Residential'],
        status: 'Active'
      }
    ])

    const showWorkerModal = ref(false)
    const showDeleteModal = ref(false)
    const selectedWorker = ref(null)

    const getStatusClass = (status) => {
      const classes = {
        'Active': 'bg-green-100 text-green-800',
        'Inactive': 'bg-red-100 text-red-800',
        'Training': 'bg-yellow-100 text-yellow-800'
      }
      return classes[status] || classes['Active']
    }

    const editWorker = (worker) => {
      selectedWorker.value = { ...worker }
      showWorkerModal.value = true
    }

    const confirmDelete = (worker) => {
      selectedWorker.value = worker
      showDeleteModal.value = true
    }

    const saveWorker = (worker) => {
      if (worker.id) {
        const index = workers.value.findIndex(w => w.id === worker.id)
        if (index !== -1) {
          workers.value[index] = worker
        }
      } else {
        worker.id = `W${String(workers.value.length + 1).padStart(3, '0')}`
        workers.value.push(worker)
      }
      showWorkerModal.value = false
    }

    const deleteWorker = () => {
      workers.value = workers.value.filter(w => w.id !== selectedWorker.value.id)
      showDeleteModal.value = false
    }

    return {
      workers,
      showWorkerModal,
      showDeleteModal,
      selectedWorker,
      getStatusClass,
      editWorker,
      confirmDelete,
      saveWorker,
      deleteWorker
    }
  }
}
</script>