<template>
  <div class="clients-management">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Client Management</h2>
      <button
        @click="showAddClientModal = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add New Client
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      {{ error }}
      <button @click="loadClients" class="underline ml-2">Retry</button>
    </div>

    <!-- Data Table -->
    <div v-else class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="client in clients" :key="client.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div>
                  <div class="text-sm font-medium text-gray-900">
                    {{ client.firstName }} {{ client.lastName }}
                  </div>
                  <div class="text-sm text-gray-500">ID: {{ client.id }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">{{ client.email }}</div>
              <div class="text-sm text-gray-500">{{ client.phone }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs rounded-full" :class="getAccountTypeClass(client.accountType)">
                {{ client.accountType }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(client.status || 'Active')">
                {{ client.status || 'Active' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="viewDetails(client)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                View
              </button>
              <button
                @click="editClient(client)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(client)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ClientModal
      v-if="showClientModal"
      :client="selectedClient"
      :loading="saveLoading"
      @save="saveClient"
      @close="closeClientModal"
    />

    <ClientDetailsModal
      v-if="showDetailsModal"
      :client="selectedClient"
      @close="closeDetailsModal"
    />

    <ConfirmModal
      v-if="showDeleteModal"
      :message="`Are you sure you want to delete ${selectedClient?.firstName} ${selectedClient?.lastName}?`"
      :loading="deleteLoading"
      @confirm="deleteClient"
      @cancel="closeDeleteModal"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mockApiService } from '../../services/mockApi'
import ClientModal from '../../components/management/ClientModal.vue'
import ClientDetailsModal from '../../components/management/ClientDetailsModal.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'

export default {
  name: 'ClientsManagement',
  components: {
    ClientModal,
    ClientDetailsModal,
    ConfirmModal
  },
  setup() {
    const clients = ref([])
    const isLoading = ref(false)
    const saveLoading = ref(false)
    const deleteLoading = ref(false)
    const error = ref(null)
    const showClientModal = ref(false)
    const showDetailsModal = ref(false)
    const showDeleteModal = ref(false)
    const selectedClient = ref(null)

    const loadClients = async () => {
      isLoading.value = true
      error.value = null
      try {
        const result = await mockApiService.getTableData('clients')
        if (Array.isArray(result)) {
          clients.value = result
        } else {
          throw new Error('Failed to load clients')
        }
      } catch (err) {
        console.error('Error loading clients:', err)
        error.value = 'Failed to load clients. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    const getAccountTypeClass = (type) => {
      const classes = {
        'Basic': 'bg-gray-100 text-gray-800',
        'Commercial': 'bg-blue-100 text-blue-800'
      }
      return classes[type] || classes['Basic']
    }

    const getStatusClass = (status) => {
      const classes = {
        'Active': 'bg-green-100 text-green-800',
        'Inactive': 'bg-red-100 text-red-800',
        'Pending': 'bg-yellow-100 text-yellow-800'
      }
      return classes[status] || classes['Active']
    }

    const viewDetails = async (client) => {
      try {
        // Fetch complete client data including addresses and vehicles
        const [addresses, vehicles] = await Promise.all([
          mockApiService.getTableData('addresses'),
          mockApiService.getTableData('memberCustomerVehicles')
        ])

        selectedClient.value = {
          ...client,
          addresses: addresses.filter(addr => addr.clientId === client.id) || [],
          vehicles: vehicles.filter(vehicle => vehicle.clientId === client.id) || []
        }
        showDetailsModal.value = true
      } catch (err) {
        console.error('Error fetching client details:', err)
        error.value = 'Failed to load client details'
      }
    }

    const editClient = (client) => {
      selectedClient.value = { ...client }
      showClientModal.value = true
    }

    const confirmDelete = (client) => {
      selectedClient.value = client
      showDeleteModal.value = true
    }

    const saveClient = async (client) => {
      saveLoading.value = true
      try {
        if (client.id) {
          await mockApiService.updateRecord('clients', client.id, client)
        } else {
          await mockApiService.createRecord('clients', client)
        }
        await loadClients()
        closeClientModal()
      } catch (err) {
        console.error('Error saving client:', err)
        error.value = 'Failed to save client. Please try again.'
      } finally {
        saveLoading.value = false
      }
    }

    const deleteClient = async () => {
      if (!selectedClient.value) return
      
      deleteLoading.value = true
      try {
        await mockApiService.deleteRecord('clients', selectedClient.value.id)
        await loadClients()
        closeDeleteModal()
      } catch (err) {
        console.error('Error deleting client:', err)
        error.value = 'Failed to delete client. Please try again.'
      } finally {
        deleteLoading.value = false
      }
    }

    const closeClientModal = () => {
      showClientModal.value = false
      selectedClient.value = null
    }

    const closeDetailsModal = () => {
      showDetailsModal.value = false
      selectedClient.value = null
    }

    const closeDeleteModal = () => {
      showDeleteModal.value = false
      selectedClient.value = null
    }

    onMounted(() => {
      loadClients()
    })

    return {
      clients,
      isLoading,
      saveLoading,
      deleteLoading,
      error,
      showClientModal,
      showDetailsModal,
      showDeleteModal,
      selectedClient,
      getAccountTypeClass,
      getStatusClass,
      viewDetails,
      editClient,
      confirmDelete,
      saveClient,
      deleteClient,
      closeClientModal,
      closeDetailsModal,
      closeDeleteModal,
      loadClients
    }
  }
}
</script>