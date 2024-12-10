<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Booking Details
      </h3>
    </template>
    <template #body>
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-medium text-gray-500">Service Information</h4>
          <div class="mt-2">
            <p><strong>Service Type:</strong> {{ booking.serviceType }}</p>
            <p><strong>Date:</strong> {{ formatDate(booking.date) }}</p>
            <p><strong>Total:</strong> ${{ booking.total.toFixed(2) }}</p>
            <p><strong>Status:</strong> {{ booking.status }}</p>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-500">Client Information</h4>
          <div class="mt-2">
            <p><strong>Name:</strong> {{ booking.client.name }}</p>
            <p><strong>Phone:</strong> {{ booking.client.phone }}</p>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-500">Service Location</h4>
          <div class="mt-2">
            <p>{{ booking.address.street }}</p>
            <p>{{ booking.address.city }}, {{ booking.address.state }} {{ booking.address.zipCode }}</p>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-500">Assigned Worker</h4>
          <div class="mt-2">
            <p v-if="booking.worker">{{ booking.worker.name }}</p>
            <p v-else class="text-gray-500">No worker assigned</p>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-gray-500">Notes</h4>
          <div class="mt-2">
            <p>{{ booking.notes || 'No notes provided' }}</p>
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
  name: 'BookingDetailsModal',
  components: {
    BaseModal,
    BaseButton
  },
  props: {
    booking: {
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