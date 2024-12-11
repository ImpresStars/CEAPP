<template>
  <div class="vehicles container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Your Vehicles</h1>
    <div v-if="vehicles.length > 0">
      <div v-for="vehicle in vehicles" :key="vehicle.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 class="text-xl font-semibold mb-2">{{ vehicle.make }} {{ vehicle.model }}</h2>
        <p>Year: {{ vehicle.year }}, Color: {{ vehicle.color }}</p>
        <p>Type: {{ vehicle.type }}</p>
        <div class="mt-2">
          <BaseButton @click="editVehicle(vehicle)" class="mr-2">Edit</BaseButton>
          <BaseButton @click="confirmDeleteVehicle(vehicle.id)" color="red">Delete</BaseButton>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-600">
      You haven't added any vehicles yet.
    </div>
    <BaseButton @click="openAddVehicleModal" class="mt-4">Add New Vehicle</BaseButton>
    <VehicleModal
      v-if="showVehicleModal"
      :vehicle="currentVehicle"
      @save="handleSaveVehicle"
      @close="closeVehicleModal"
    />
    <ConfirmModal
      v-if="showDeleteConfirmModal"
      message="Are you sure you want to delete this vehicle?"
      @confirm="deleteVehicle"
      @cancel="() => (showDeleteConfirmModal = false)"
    />
    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '../components/BaseButton.vue';
import VehicleModal from '../components/VehicleModal.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import { useNotification } from '../composables/useNotification';

export default {
  name: 'Vehicles',
  components: {
    BaseButton,
    VehicleModal,
    ConfirmModal,
  },
  setup() {
    const store = useStore();
    const notification = useNotification();
    const showVehicleModal = ref(false);
    const showDeleteConfirmModal = ref(false);
    const currentVehicle = ref(null);
    const vehicleToDeleteId = ref(null);

    const vehicles = computed(() => store.getters['vehicles/allVehicles']);
    const error = computed(() => store.getters['vehicles/error']);

    const fetchVehicles = async () => {
      try {
        await store.dispatch('vehicles/fetchVehicles');
      } catch (err) {
        notification.showError('Failed to fetch vehicles');
      }
    };

    onMounted(fetchVehicles);

    const openAddVehicleModal = () => {
      currentVehicle.value = null;
      showVehicleModal.value = true;
    };

    const closeVehicleModal = () => {
      showVehicleModal.value = false;
      currentVehicle.value = null;
    };

    const editVehicle = (vehicle) => {
      currentVehicle.value = { ...vehicle };
      showVehicleModal.value = true;
    };

    const confirmDeleteVehicle = (id) => {
      vehicleToDeleteId.value = id;
      showDeleteConfirmModal.value = true;
    };

    const handleSaveVehicle = async (vehicle) => {
      try {
        if (vehicle.id) {
          await store.dispatch('vehicles/updateVehicle', { id: vehicle.id, data: vehicle });
          notification.showSuccess('Vehicle updated successfully');
        } else {
          await store.dispatch('vehicles/createVehicle', vehicle);
          notification.showSuccess('Vehicle added successfully');
        }
        showVehicleModal.value = false;
      } catch {
        notification.showError('Failed to save vehicle');
      }
    };

    const deleteVehicle = async () => {
      try {
        await store.dispatch('vehicles/deleteVehicle', vehicleToDeleteId.value);
        notification.showSuccess('Vehicle deleted successfully');
        showDeleteConfirmModal.value = false;
      } catch {
        notification.showError('Failed to delete vehicle');
      }
    };

    return {
      vehicles,
      error,
      showVehicleModal,
      showDeleteConfirmModal,
      currentVehicle,
      openAddVehicleModal,
      closeVehicleModal,
      editVehicle,
      confirmDeleteVehicle,
      handleSaveVehicle,
      deleteVehicle,
    };
  },
};
</script>

<style scoped>
.vehicles {
  max-width: 800px;
  margin: auto;
}
</style>
