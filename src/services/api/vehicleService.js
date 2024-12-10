import { axiosInstance } from './axiosInstance';

export const vehicleService = {
  async fetchVehicles(userId) {
    try {
      const response = await axiosInstance.get(`/users/${userId}/vehicles`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('fetchVehicles error:', error.message);
      return { success: false, error: error.message };
    }
  },

  async saveVehicle(userId, vehicleData) {
    try {
      const method = vehicleData.id ? 'put' : 'post';
      const url = vehicleData.id
        ? `/users/${userId}/vehicles/${vehicleData.id}`
        : `/users/${userId}/vehicles`;
      const response = await axiosInstance[method](url, vehicleData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('saveVehicle error:', error.message);
      return { success: false, error: error.message };
    }
  },

  async deleteVehicle(userId, vehicleId) {
    try {
      await axiosInstance.delete(`/users/${userId}/vehicles/${vehicleId}`);
      return { success: true };
    } catch (error) {
      console.error('deleteVehicle error:', error.message);
      return { success: false, error: error.message };
    }
  }
};
