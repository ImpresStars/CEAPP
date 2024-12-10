<template>
  <div class="booking-card bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-semibold mb-2">{{ booking.serviceType }}</h3>
        <p class="text-gray-600 mb-1">
          <strong>Date:</strong> {{ formatDate(booking.date) }}
        </p>
        <p class="text-gray-600 mb-1">
          <strong>Status:</strong> 
          <span :class="getStatusClass">{{ booking.status }}</span>
        </p>
        <p v-if="address" class="text-gray-600 mb-1">
          <strong>Location:</strong> {{ formatAddress }}
        </p>
        <p v-if="vehicle" class="text-gray-600 mb-1">
          <strong>Vehicle:</strong> {{ formatVehicle }}
        </p>
        <p v-if="booking.notes" class="text-gray-600 mt-2">
          <strong>Notes:</strong> {{ booking.notes }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <BaseButton @click="$emit('view-details', booking)" size="sm">
          View Details
        </BaseButton>
        <BaseButton 
          v-if="canCancel" 
          @click="$emit('cancel', booking)" 
          color="red"
          size="sm"
        >
          Cancel
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import BaseButton from './BaseButton.vue'

export default {
  name: 'BookingCard',
  components: {
    BaseButton
  },
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  emits: ['view-details', 'cancel'],
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

    const formatAddress = computed(() => {
      if (!address.value) return ''
      return `${address.value.street}, ${address.value.city}`
    })

    const formatVehicle = computed(() => {
      if (!vehicle.value) return ''
      return `${vehicle.value.year} ${vehicle.value.make} ${vehicle.value.model}`
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

    const canCancel = computed(() => {
      return ['Pending', 'Confirmed'].includes(props.booking.status)
    })

    return {
      address,
      vehicle,
      formatAddress,
      formatVehicle,
      formatDate,
      getStatusClass,
      canCancel
    }
  }
}
</script>