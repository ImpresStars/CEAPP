import { vehicleService } from '@/services/api';

export const actions = {
  async fetchVehicles({ commit }) {
    try {
      const response = await vehicleService.fetchVehicles();
      commit('SET_VEHICLES', response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  },
  async saveVehicle({ commit }, vehicle) {
    try {
      const response = await vehicleService.saveVehicle(vehicle);
      commit(vehicle.id ? 'UPDATE_VEHICLE' : 'ADD_VEHICLE', response.data);
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  },
  async deleteVehicle({ commit }, vehicleId) {
    try {
      await vehicleService.deleteVehicle(vehicleId);
      commit('REMOVE_VEHICLE', vehicleId);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  },
};
