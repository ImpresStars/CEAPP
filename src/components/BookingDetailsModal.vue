<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Booking Details
      </h3>
    </template>
    <template #body>
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-gray-500">Service Information</h4>
          <div class="mt-2">
            <p><strong>Service Type:</strong> {{ booking.serviceType }}</p>
            <p><strong>Date:</strong> {{ formatDate(booking.date) }}</p>
            <p>
              <strong>Status:</strong> 
              <span :class="getStatusClass">{{ booking.status }}</span>
            </p>
          </div>
        </div>

        <div v-if="address">
          <h4 class="text-sm font-medium text-gray-500">Service Location</h4>
          <div class="mt-2">
            <p>{{ address.name }}</p>
            <p>{{ address.street }}</p>
            <p>{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
          </div>
        </div>

        <div v-if="vehicle">
          <h4 class="text-sm font-medium text-gray-500">Vehicle Information</h4>
          <div class="mt-2">
            <p>{{ vehicle.year }} {{ vehicle.make }} {{ vehicle.model }}</p>
            <p>Color: {{ vehicle.color }}</p>
            <p>Type: {{ vehicle.type }}</p>
          </div>
        </div>

        <div v-if="booking.notes">
          <h4 class="text-sm font-medium text-gray-500">Special Instructions</h4>
          <div class="mt-2">
            <p>{{ booking.notes }}</p>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <BaseButton @click="$emit('close')">Close</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

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
  setup(props) {
    const store = useStore()

    const address = computed(() => {
      const addresses = store.getters['addresses/allAddresses']
      return addresses.find(a => a.id === props.booking.addressId)
    })

    const vehicle = computed(() => {
      const vehicles = store.getters['vehicles/allVehicles']
      return vehicles.find(v => v.id === props.booking.vehicleId)
    })

    const formatDate = (date) => {
      return new Date(date).toLocaleString()
    }

    const getStatusClass = computed(() => {
      const classes = {
        'Pending': 'text-yellow-600',
        'Confirmed': 'text-blue-600',
        'In Progress': 'text-blue-800',
        'Completed': 'text-green-600',
        'Cancelled': 'text-red-600'
      }
      return classes[props.booking.status] || 'text-gray-600'
    })

    return {
      address,
      vehicle,
      formatDate,
      getStatusClass
    }
  }
}
</script>