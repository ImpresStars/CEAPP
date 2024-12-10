<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ mode === 'add' ? 'Add New Record' : 'Edit Record' }}
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="saveRecord" class="space-y-4">
        <div v-for="column in editableColumns" :key="column.key">
          <component
            :is="getInputComponent(column.type)"
            v-model="form[column.key]"
            :id="column.key"
            :label="column.label"
            :type="getInputType(column.type)"
            :options="getOptionsForColumn(column)"
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
import { ref, computed, onMounted } from 'vue'
import BaseModal from '../BaseModal.vue'
import BaseInput from '../BaseInput.vue'
import BaseSelect from '../BaseSelect.vue'
import BaseButton from '../BaseButton.vue'

export default {
  name: 'DatabaseRecordModal',
  components: {
    BaseModal,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  props: {
    record: {
      type: Object,
      default: null
    },
    columns: {
      type: Array,
      required: true
    },
    mode: {
      type: String,
      required: true,
      validator: value => ['add', 'edit'].includes(value)
    }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const form = ref({})

    const editableColumns = computed(() => {
      return props.columns.filter(col => col.key !== 'id' && col.key !== 'created_at')
    })

    onMounted(() => {
      if (props.record) {
        form.value = { ...props.record }
      } else {
        // Initialize empty form
        editableColumns.value.forEach(col => {
          form.value[col.key] = getDefaultValue(col.type)
        })
      }
    })

    const getInputComponent = (type) => {
      switch (type) {
        case 'select':
          return 'BaseSelect'
        default:
          return 'BaseInput'
      }
    }

    const getInputType = (type) => {
      switch (type) {
        case 'number':
        case 'currency':
          return 'number'
        case 'date':
          return 'date'
        default:
          return 'text'
      }
    }

    const getDefaultValue = (type) => {
      switch (type) {
        case 'number':
        case 'currency':
          return 0
        case 'date':
          return new Date().toISOString().split('T')[0]
        case 'array':
          return []
        default:
          return ''
      }
    }

    const getOptionsForColumn = (column) => {
      // Return options for select inputs based on column type
      switch (column.key) {
        case 'status':
          return [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'pending', label: 'Pending' }
          ]
        case 'accountType':
          return [
            { value: 'basic', label: 'Basic' },
            { value: 'commercial', label: 'Commercial' }
          ]
        default:
          return []
      }
    }

    const saveRecord = () => {
      emit('save', form.value)
    }

    return {
      form,
      editableColumns,
      getInputComponent,
      getInputType,
      getOptionsForColumn,
      saveRecord
    }
  }
}
</script>