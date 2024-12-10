export default {
  SET_VEHICLES(state, vehicles) {
    state.vehicles = vehicles
  },
  ADD_VEHICLE(state, vehicle) {
    state.vehicles.push(vehicle)
  },
  UPDATE_VEHICLE(state, updatedVehicle) {
    const index = state.vehicles.findIndex(v => v.id === updatedVehicle.id)
    if (index !== -1) {
      state.vehicles.splice(index, 1, updatedVehicle)
    }
  },
  REMOVE_VEHICLE(state, vehicleId) {
    state.vehicles = state.vehicles.filter(v => v.id !== vehicleId)
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  RESET_STATE(state) {
    state.vehicles = []
    state.loading = false
    state.error = null
  }
}