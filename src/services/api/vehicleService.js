import axios from 'axios';

const vehicleService = {
  fetchVehicles() {
    return axios.get('/api/vehicles');
  },
  saveVehicle(vehicle) {
    return vehicle.id
      ? axios.put(`/api/vehicles/${vehicle.id}`, vehicle)
      : axios.post('/api/vehicles', vehicle);
  },
  deleteVehicle(vehicleId) {
    return axios.delete(`/api/vehicles/${vehicleId}`);
  },
};

export default vehicleService;
