<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Client Details
      </h3>
    </template>
    <template #body>
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-medium text-gray-500">Basic Information</h4>
          <div class="mt-2">
            <p><strong>Name:</strong> {{ client.firstName }} {{ client.lastName }}</p>
            <p><strong>Email:</strong> {{ client.email }}</p>
            <p><strong>Phone:</strong> {{ client.phone }}</p>
            <p><strong>Account Type:</strong> {{ client.accountType }}</p>
            <p><strong>Status:</strong> {{ client.status || 'Active' }}</p>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-500">Addresses</h4>
          <div class="mt-2 space-y-2">
            <div v-for="address in client.addresses" :key="address.id" class="bg-gray-50 p-2 rounded">
              <p><strong>{{ address.name }}:</strong></p>
              <p>{{ address.street }}</p>
              <p>{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
            </div>
            <p v-if="!client.addresses?.length" class="text-gray-500">No addresses added</p>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-500">Vehicles</h4>
          <div class="mt-2 space-y-2">
            <div v-for="vehicle in client.vehicles" :key="vehicle.id" class="bg-gray-50 p-2 rounded">
              <p>{{ vehicle.year }} {{ vehicle.make }} {{ vehicle.model }}</p>
              <p>Color: {{ vehicle.color }}</p>
              <p>Type: {{ vehicle.type }}</p>
            </div>
            <p v-if="!client.vehicles?.length" class="text-gray-500">No vehicles added</p>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-500">Account History</h4>
          <div class="mt-2 space-y-2">
            <div v-if="client.accountHistory?.length" class="space-y-1">
              <div v-for="(history, index) in client.accountHistory" :key="index" class="text-sm">
                <p>Changed to {{ history.type }} on {{ formatDate(history.timestamp) }}</p>
              </div>
            </div>
            <p v-else class="text-gray-500">No account history available</p>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <BaseButton @click="$emit('close')">Close</BaseButton>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '../BaseModal.vue'
import BaseButton from '../BaseButton.vue'

export default {
  name: 'ClientDetailsModal',
  components: {
    BaseModal,
    BaseButton
  },
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup() {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString()
    }

    return {
      formatDate
    }
  }
}
</script>