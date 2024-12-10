<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ client ? 'Edit Client' : 'Add New Client' }}
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="saveClient">
        <div class="space-y-4">
          <BaseInput
            v-model="form.name"
            id="name"
            label="Name"
            required
          />
          <BaseInput
            v-model="form.email"
            id="email"
            label="Email"
            type="email"
            required
          />
          <BaseInput
            v-model="form.phone"
            id="phone"
            label="Phone"
            required
          />
          <BaseSelect
            v-model="form.accountType"
            id="accountType"
            label="Account Type"
            :options="accountTypeOptions"
            required
          />
          <BaseSelect
            v-model="form.status"
            id="status"
            label="Status"
            :options="statusOptions"
            required
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
import BaseButton from '../BaseButton.vue'

export default {
  name: 'ClientModal',
  components: {
    BaseModal,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  props: {
    client: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const form = ref({
      name: '',
      email: '',
      phone: '',
      accountType: 'Basic',
      status: 'Active',
      addresses: [],
      vehicles: []
    })

    const accountTypeOptions = [
      { value: 'Basic', label: 'Basic' },
      { value: 'Commercial', label: 'Commercial' }
    ]

    const statusOptions = [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Pending', label: 'Pending' }
    ]

    onMounted(() => {
      if (props.client) {
        form.value = {
          ...props.client
        }
      }
    })

    const saveClient = () => {
      emit('save', {
        id: props.client?.id,
        ...form.value
      })
    }

    return {
      form,
      accountTypeOptions,
      statusOptions,
      saveClient
    }
  }
}
</script>