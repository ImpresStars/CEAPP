import { apiService } from '../../../services/api';
import { storage } from '../../../services/storage';

export default {
  setVehicles({ commit }, vehicles) {
    commit('SET_VEHICLES', vehicles);
    return { success: true };
  },

  async fetchVehicles({ commit, rootState }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    try {
      const result = await apiService.fetchVehicles(rootState.auth.user?.id);
      if (result.success) {
        commit('SET_VEHICLES', result.data || []);
        return { success: true, data: result.data };
      }
      throw new Error(result.error || 'Failed to fetch vehicles');
    } catch (error) {
      commit('SET_ERROR', error.message);
      console.error('fetchVehicles error:', error.message);
      return { success: false, error: error.message };
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async saveVehicle({ dispatch }, vehicleData) {
    console.log('saveVehicle called with:', vehicleData);
    if (vehicleData.id) {
      return await dispatch('updateVehicle', { id: vehicleData.id, data: vehicleData });
    } else {
      return await dispatch('createVehicle', vehicleData);
    }
  },

  async createVehicle({ commit, rootState }, vehicleData) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    try {
      const result = await apiService.saveVehicle(rootState.auth.user.id, vehicleData);
      if (result.success) {
        commit('ADD_VEHICLE', result.data);
        return { success: true, data: result.data };
      }
      throw new Error(result.error || 'Failed to create vehicle');
    } catch (error) {
      commit('SET_ERROR', error.message);
      console.error('createVehicle error:', error.message);
      return { success: false, error: error.message };
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async updateVehicle({ commit, rootState }, { id, data }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    try {
      const result = await apiService.saveVehicle(rootState.auth.user.id, { ...data, id });
      if (result.success) {
        commit('UPDATE_VEHICLE', result.data);
        return { success: true, data: result.data };
      }
      throw new Error(result.error || 'Failed to update vehicle');
    } catch (error) {
      commit('SET_ERROR', error.message);
      console.error('updateVehicle error:', error.message);
      return { success: false, error: error.message };
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async deleteVehicle({ commit, rootState }, vehicleId) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);

    try {
      const result = await apiService.deleteVehicle(rootState.auth.user.id, vehicleId);
      if (result.success) {
        commit('REMOVE_VEHICLE', vehicleId);
        return { success: true };
      }
      throw new Error(result.error || 'Failed to delete vehicle');
    } catch (error) {
      commit('SET_ERROR', error.message);
      console.error('deleteVehicle error:', error.message);
      return { success: false, error: error.message };
    } finally {
      commit('SET_LOADING', false);
    }
  },

  resetVehicles({ commit }) {
    commit('RESET_STATE');
    storage.remove('userVehicles');
  }
};
