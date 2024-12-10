<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ address ? 'Edit Address' : 'Add New Address' }}
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseInput
          v-model="form.name"
          id="addressName"
          label="Address Name"
          placeholder="e.g., Home, Office"
          :error="errors.name"
          required
        />
        <BaseInput
          v-model="form.street"
          id="street"
          label="Street Address"
          :error="errors.street"
          required
        />
        <BaseInput
          v-model="form.city"
          id="city"
          label="City"
          :error="errors.city"
          required
        />
        <BaseInput
          v-model="form.state"
          id="state"
          label="State/Province"
          :error="errors.state"
          required
        />
        <BaseInput
          v-model="form.zipCode"
          id="zipCode"
          label="ZIP/Postal Code"
          :error="errors.zipCode"
          required
        />
      </form>
    </template>
    <template #footer>
      <div class="flex justify-end space-x-2">
        <BaseButton
          type="button"
          color="gray"
          @click="$emit('close')"
          :disabled="loading"
        >
          Cancel
        </BaseButton>
        <BaseButton
          type="submit"
          @click="handleSubmit"
          :disabled="!isValid || loading"
        >
          {{ loading ? 'Saving...' : 'Save Address' }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import { validateAddress } from '../utils/addressUtils'

export default {
  name: 'AddressModal',
  components: {
    BaseModal,
    BaseInput,
    BaseButton
  },
  props: {
    address: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const form = ref({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: ''
    })

    const errors = ref({})

    const isValid = computed(() => {
      return !Object.values(errors.value).some(error => error) &&
             form.value.name &&
             form.value.street &&
             form.value.city &&
             form.value.state &&
             form.value.zipCode
    })

    const validateForm = () => {
      errors.value = validateAddress(form.value)
      return Object.keys(errors.value).length === 0
    }

    const handleSubmit = () => {
      if (!validateForm()) return

      emit('save', {
        ...form.value,
        id: props.address?.id
      })
    }

    onMounted(() => {
      if (props.address) {
        form.value = { ...props.address }
      }
    })

    return {
      form,
      errors,
      isValid,
      handleSubmit
    }
  }
}
</script>