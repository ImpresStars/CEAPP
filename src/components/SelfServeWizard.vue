<script>
import { ref, computed } from 'vue'
import BaseSelect from './BaseSelect.vue'
import BaseInput from './BaseInput.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseButton from './BaseButton.vue'
import { apiService } from '../services/api'

export default {
  name: 'SelfServeWizard',
  components: {
    BaseSelect,
    BaseInput,
    BaseTextarea,
    BaseButton
  },
  setup() {
    const step = ref(1)
    const form = ref({
      serviceType: '',
      date: '',
      name: '',
      email: '',
      phone: '',
      notes: ''
    })
    const error = ref(null)

    const serviceTypes = [
      { value: 'House Cleaning', label: 'House Cleaning' },
      { value: 'Carpet Cleaning', label: 'Carpet Cleaning' },
      { value: 'Vehicle Detailing', label: 'Vehicle Detailing' }
    ]

    const minDate = computed(() => {
      const date = new Date()
      date.setDate(date.getDate() + 7) // Set minimum date to 1 week from now
      return date.toISOString().split('T')[0]
    })

    const nextStep = () => {
      if (step.value < 3) {
        step.value++
      }
    }

    const isFormValid = computed(() => {
      return form.value.name && form.value.email && form.value.phone
    })

    const submitBooking = async () => {
      try {
        await apiService.createBooking({
          ...form.value,
          status: 'Pending',
          total: 100.00, // This would normally be calculated based on the service
          serviceDetails: {
            type: form.value.serviceType,
            notes: form.value.notes
          }
        })
        step.value = 4
      } catch (err) {
        console.error('Error creating booking:', err)
        error.value = 'Failed to create booking. Please try again later.'
      }
    }

    return {
      step,
      form,
      serviceTypes,
      minDate,
      nextStep,
      submitBooking,
      error,
      isFormValid
    }
  }
}
</script>