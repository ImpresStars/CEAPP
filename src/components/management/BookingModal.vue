<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ booking ? 'Edit Booking' : 'Add New Booking' }}
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="saveBooking">
        <div class="space-y-4">
          <BaseSelect
            v-model="form.serviceType"
            id="serviceType"
            label="Service Type"
            :options="serviceTypeOptions"
            required
          />
          <BaseInput
            v-model="form.date"
            id="date"
            label="Date and Time"
            type="datetime-local"
            required
          />
          <BaseInput
            v-model="form.total"
            id="total"
            label="Total Amount"
            type="number"
            step="0.01"
            required
          />
          <BaseSelect
            v-model="form.status"
            id="status"
            label="Status"
            :options="statusOptions"
            required
          />
          <BaseSelect
            v-model="form.clientId"
            id="client"
            label="Client"
            :options="clientOptions"
            required
          />
          <BaseTextarea
            v-model="form.notes"
            id="notes"
            label="Notes"
            rows="3"
          />
        </div>
        <div class="mt-4 flex justify-end space-x-2">
          <BaseButton type="button" color="gray" @click="$emit('close')">Cancel</BaseButton>
          <BaseButton type="submit">Save</BaseButton>
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<script>
import { ref, onMounted } from 'vue'
import BaseModal from '../BaseModal.vue'
import BaseInput from '../BaseInput.vue'
import BaseSelect from '../BaseSelect.vue'
import BaseTextarea from '../BaseTextarea.vue'
import BaseButton from '../BaseButton.vue'

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
    booking: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const form = ref({
      serviceType: '',
      date: '',
      total: '',
      status: 'Pending',
      clientId: '',
      notes: ''
    })

    const serviceTypeOptions = [
      { value: 'House Cleaning', label: 'House Cleaning' },
      { value: 'Commercial Cleaning', label: 'Commercial Cleaning' },
      { value: 'Vehicle Detailing', label: 'Vehicle Detailing' },
      { value: 'Carpet Cleaning', label: 'Carpet Cleaning' }
    ]

    const statusOptions = [
      { value: 'Pending', label: 'Pending' },
      { value: 'Confirmed', label: 'Confirmed' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Cancelled', label: 'Cancelled' }
    ]

    const clientOptions = [
      { value: 'C001', label: 'John Smith' },
      { value: 'C002', label: 'Tech Corp' }
    ]

    onMounted(() => {
      if (props.booking) {
        form.value = {
          ...props.booking,
          clientId: props.booking.client.id,
          date: new Date(props.booking.date).toISOString().slice(0, 16)
        }
      }
    })

    const saveBooking = () => {
      const client = clientOptions.find(c => c.value === form.value.clientId)
      emit('save', {
        id: props.booking?.id,
        ...form.value,
        client: {
          id: form.value.clientId,
          name: client.label
        }
      })
    }

    return {
      form,
      serviceTypeOptions,
      statusOptions,
      clientOptions,
      saveBooking
    }
  }
}
</script>