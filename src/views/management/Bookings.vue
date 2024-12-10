<!-- Previous imports and template remain the same until the setup function -->

setup() {
  const store = useStore()
  const bookings = ref([])
  const filterStatus = ref('')
  const showBookingModal = ref(false)
  const showDetailsModal = ref(false)
  const showAssignmentModal = ref(false)
  const showCancelModal = ref(false)
  const selectedBooking = ref(null)

  const loadBookings = async () => {
    try {
      const result = await store.dispatch('bookings/fetchBookings')
      if (result.success) {
        bookings.value = result.data
      }
    } catch (error) {
      console.error('Error loading bookings:', error)
    }
  }

  onMounted(() => {
    loadBookings()
  })

  // Rest of the setup function remains the same
  
  return {
    bookings,
    filterStatus,
    showBookingModal,
    showDetailsModal,
    showAssignmentModal,
    showCancelModal,
    selectedBooking,
    statusOptions,
    filteredBookings,
    formatDate,
    getStatusClass,
    viewDetails,
    editBooking,
    assignWorker,
    confirmCancel,
    saveBooking,
    assignWorkerToBooking,
    cancelBooking
  }
}

<!-- Rest of the file remains the same -->