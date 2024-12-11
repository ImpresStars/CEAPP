export const mutations = {
  SET_VEHICLES(state, vehicles) {
    state.vehicles = vehicles;
  },
  ADD_VEHICLE(state, vehicle) {
    state.vehicles.push(vehicle);
  },
  REMOVE_VEHICLE(state, vehicleId) {
    state.vehicles = state.vehicles.filter(v => v.id !== vehicleId);
  },
};