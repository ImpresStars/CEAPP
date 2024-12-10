<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Book a New Service
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseSelect
          v-model="form.serviceType"
          id="serviceType"
          label="Service Type"
          :options="availableServices"
          @change="handleServiceTypeChange"
          required
        />
        
        <BaseSelect
          v-model="form.addressId"
          id="address"
          label="Service Address"
          :options="addressOptions"
          required
        />
        <p v-if="!clientAddresses.length" class="text-red-500">
          Please add an address in your profile before booking.
        </p>

        <BaseSelect
          v-if="isVehicleService"
          v-model="form.vehicleId"
          id="vehicle"
          label="Vehicle"
          :options="vehicleOptions"
          required
        />
        <p v-if="isVehicleService && !clientVehicles.length" class="text-red-500">
          Please add a vehicle in your profile before booking vehicle services.
        </p>

        <BaseInput
          v-model="form.date"
          id="date"
          label="Date and Time"
          type="datetime-local"
          :min="minDate"
          :max="maxDate"
          required
        />

        <BaseTextarea
          v-model="form.notes"
          id="notes"
          label="Special Instructions"
          rows="3"
        />

        <div v-if="validationError" class="text-red-500 text-sm mt-2">
          {{ validationError }}
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-end space-x-2">
        <BaseButton type="button" color="gray" @click="$emit('close')">Cancel</BaseButton>
        <BaseButton 
          type="button" 
          @click="handleSubmit" 
          :disabled="!isFormValid || isLoading"
        >
          {{ isLoading ? 'Booking...' : 'Book Service' }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import BaseModal from './BaseModal.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseButton from './BaseButton.vue'

export default {
  name: 'BookingModal',
  components: {
    BaseModal,
    BaseInput,
    BaseSelect,
    BaseTextarea,
    BaseButton
  },
  props: {
    clientAddresses: {
      type: Array,
      required: true
    },
    clientVehicles: {
      type: Array,
      required: true
    }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const store = useStore()
    const form = ref({
      serviceType: '',
      addressId: '',
      vehicleId: '',
      date: '',
      notes: ''
    })

    const validationError = ref('')
    const isLoading = ref(false)

    const isCommercial = computed(() => store.getters['auth/isCommercial'])

    const serviceTypes = [
      { value: 'House Cleaning', label: 'House Cleaning', requiresCommercial: false },
      { value: 'Commercial Cleaning', label: 'Commercial Cleaning', requiresCommercial: true },
      { value: 'Vehicle Detailing', label: 'Vehicle Detailing', requiresCommercial: false },
      { value: 'Carpet Cleaning', label: 'Carpet Cleaning', requiresCommercial: false },
      { value: 'Post-Construction', label: 'Post-Construction Cleaning', requiresCommercial: true }
    ]

    const availableServices = computed(() => 
      serviceTypes
        .filter(service => !service.requiresCommercial || isCommercial.value)
        .map(({ value, label }) => ({ value, label }))
    )

    const addressOptions = computed(() => 
      props.clientAddresses.map(address => ({
        value: address.id,
        label: `${address.name}: ${address.street}, ${address.city}`
      }))
    )

    const vehicleOptions = computed(() => 
      props.clientVehicles.map(vehicle => ({
        value: vehicle.id,
        label: `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.color})`
      }))
    )

    const isVehicleService = computed(() => 
      form.value.serviceType === 'Vehicle Detailing'
    )

    const minDate = computed(() => {
      const date = new Date()
      date.setHours(date.getHours() + 48) // 48 hours minimum notice
      return date.toISOString().slice(0, 16)
    })

    const maxDate = computed(() => {
      const date = new Date()
      date.setDate(date.getDate() + 30) // 30 days maximum advance booking
      return date.toISOString().slice(0, 16)
    })

    const isFormValid = computed(() => {
      if (!form.value.serviceType || !form.value.date || !form.value.addressId) return false
      
      if (isVehicleService.value) {
        return !!form.value.vehicleId
      }
      return true
    })

    const handleServiceTypeChange = () => {
      // Reset location-specific fields when service type changes
      form.value.vehicleId = ''
      validationError.value = ''
    }

    const validateBookingTime = () => {
      const selectedDate = new Date(form.value.date)
      const now = new Date()
      const hoursDiff = (selectedDate - now) / (1000 * 60 * 60)
      
      if (selectedDate <= now) {
        validationError.value = 'Cannot book appointments in the past'
        return false
      }

      if (hoursDiff < 48) {
        validationError.value = 'Bookings must be made at least 48 hours in advance'
        return false
      }

      validationError.value = ''
      return true
    }

    const handleSubmit = async () => {
      if (!isFormValid.value) return
      if (!validateBookingTime()) return

      isLoading.value = true
      validationError.value = ''

      try {
        const result = await store.dispatch('bookings/createBooking', { ...form.value })
        if (result.success) {
          emit('save', result.data)
        } else {
          validationError.value = result.error || 'Failed to create booking'
        }
      } catch (error) {
        console.error('Error creating booking:', error)
        validationError.value = error.message || 'An unexpected error occurred'
      } finally {
        isLoading.value = false
      }
    }

    return {
      form,
      availableServices,
      addressOptions,
      vehicleOptions,
      isVehicleService,
      minDate,
      maxDate,
      isFormValid,
      validationError,
      isLoading,
      handleSubmit,
      handleServiceTypeChange
    }
  }
}
</script>