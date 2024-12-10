<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ vehicle && vehicle.id ? 'Edit Vehicle' : 'Add New Vehicle' }}
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="saveVehicle">
        <BaseSelect v-model="form.make" :options="carMakes" id="make" label="Make" @change="updateModels" />
        <BaseSelect v-model="form.model" :options="carModels" id="model" label="Model" />
        <BaseInput v-model="form.year" id="year" label="Year" type="number" />
        <BaseInput v-model="form.color" id="color" label="Color" />
        <BaseSelect v-model="form.type" :options="vehicleTypes" id="type" label="Vehicle Type" />
        <div class="mt-4 flex justify-end">
          <BaseButton type="submit" class="mr-2">Save Vehicle</BaseButton>
          <BaseButton v-if="vehicle && vehicle.id" @click="$emit('delete', vehicle.id)" color="red">Delete</BaseButton>
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import BaseButton from './BaseButton.vue'

export default {
  name: 'VehicleModal',
  components: {
    BaseModal,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  props: {
    vehicle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['save', 'delete', 'close'],
  setup(props, { emit }) {
    const form = ref({
      make: '',
      model: '',
      year: '',
      color: '',
      type: ''
    })

    const vehicleTypes = [
      { value: 'Sedan', label: 'Sedan' },
      { value: 'SUV', label: 'SUV' },
      { value: 'Truck', label: 'Truck' },
      { value: 'Van', label: 'Van' },
      { value: 'Motorcycle', label: 'Motorcycle' }
    ]

    const carMakes = [
      { value: 'Toyota', label: 'Toyota' },
      { value: 'Honda', label: 'Honda' },
      { value: 'Ford', label: 'Ford' },
      { value: 'Chevrolet', label: 'Chevrolet' },
      { value: 'BMW', label: 'BMW' },
      { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
    ]

    const carModels = ref([])

    const carModelsByMake = {
      Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander'],
      Honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
      Ford: ['F-150', 'Mustang', 'Explorer', 'Escape'],
      Chevrolet: ['Silverado', 'Malibu', 'Equinox', 'Tahoe'],
      BMW: ['3 Series', '5 Series', 'X3', 'X5'],
      'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE'],
    }

    const updateModels = () => {
      carModels.value = (carModelsByMake[form.value.make] || []).map(model => ({ value: model, label: model }))
      form.value.model = ''
    }

    onMounted(() => {
      if (props.vehicle && props.vehicle.id) {
        form.value = { ...props.vehicle }
        updateModels()
      }
    })

    const saveVehicle = () => {
      emit('save', { ...form.value, id: props.vehicle ? props.vehicle.id : null })
    }

    watch(() => form.value.make, updateModels)

    return {
      form,
      vehicleTypes,
      carMakes,
      carModels,
      updateModels,
      saveVehicle
    }
  }
}
</script>