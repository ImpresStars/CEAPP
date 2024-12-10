<!-- Previous content remains the same until the refreshData function -->

const refreshData = async () => {
  if (!selectedTable.value) return
  
  loading.value = true
  error.value = null
  
  try {
    // Get data from Vuex store based on table name
    let result = []
    switch (selectedTable.value) {
      case 'clients':
        result = store.getters['auth/activeClients']
        break
      case 'bookings':
        result = store.getters['bookings/allBookings']
        break
      case 'workers':
        result = store.getters['workers/allWorkers']
        break
      case 'addresses':
        result = store.getters['addresses/allAddresses']
        break
      case 'vehicles':
        result = store.getters['vehicles/allVehicles']
        break
      default:
        result = await mockApiService.getTableData(selectedTable.value)
    }
    
    if (Array.isArray(result)) {
      tableData.value = result
    } else {
      console.warn('No data returned for table:', selectedTable.value)
      tableData.value = []
    }
  } catch (err) {
    console.error('Error fetching data:', err)
    error.value = 'Failed to fetch data'
    tableData.value = []
  } finally {
    loading.value = false
  }
}

<!-- Rest of the file remains the same -->