<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ worker ? 'Edit Worker' : 'Add New Worker' }}
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="saveWorker">
        <div class="space-y-4">
          <BaseInput
            v-model="form.name"
            id="name"
            label="Name"
            required
          />
          <BaseSelect
            v-model="form.level"
            id="level"
            label="Level"
            :options="levelOptions"
            required
          />
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
            <div class="space-y-2">
              <div v-for="cert in certificationOptions" :key="cert.value" class="flex items-center">
                <input
                  type="checkbox"
                  :id="cert.value"
                  v-model="form.certifications"
                  :value="cert.value"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <label :for="cert.value" class="ml-2 text-sm text-gray-900">{{ cert.label }}</label>
              </div>
            </div>
          </div>
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
  name: 'WorkerModal',
  components: {
    BaseModal,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  props: {
    worker: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const form = ref({
      name: '',
      level: '',
      certifications: [],
      status: 'Active'
    })

    const levelOptions = [
      { value: 'Junior', label: 'Junior' },
      { value: 'Intermediate', label: 'Intermediate' },
      { value: 'Senior', label: 'Senior' },
      { value: 'Expert', label: 'Expert' }
    ]

    const certificationOptions = [
      { value: 'General Cleaning', label: 'General Cleaning' },
      { value: 'Residential', label: 'Residential' },
      { value: 'Commercial', label: 'Commercial' },
      { value: 'Carpet Cleaning', label: 'Carpet Cleaning' },
      { value: 'Vehicle Detailing', label: 'Vehicle Detailing' }
    ]

    const statusOptions = [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Training', label: 'Training' }
    ]

    onMounted(() => {
      if (props.worker) {
        form.value = {
          ...props.worker
        }
      }
    })

    const saveWorker = () => {
      emit('save', {
        id: props.worker?.id,
        ...form.value
      })
    }

    return {
      form,
      levelOptions,
      certificationOptions,
      statusOptions,
      saveWorker
    }
  }
}
</script>