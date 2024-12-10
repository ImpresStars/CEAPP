<template>
  <div class="booking-history container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Your Booking History</h1>
    <div v-if="isLoading" class="text-center">
      <p>Loading bookings...</p>
    </div>
    <div v-else>
      <h2 class="text-2xl font-bold mb-4">Upcoming Services</h2>
      <div v-if="upcomingBookings.length > 0">
        <div v-for="booking in upcomingBookings" :key="booking.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
          <BookingCard :booking="booking" @cancel="cancelBooking" />
        </div>
      </div>
      <div v-else class="text-center text-gray-600 mb-8">
        You don't have any upcoming bookings.
      </div>
      <h2 class="text-2xl font-bold mb-4">Past Services</h2>
      <div v-if="pastBookings.length > 0">
        <div v-for="booking in pastBookings" :key="booking.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
          <BookingCard :booking="booking" />
        </div>
      </div>
      <div v-else class="text-center text-gray-600">
        You don't have any past bookings.
      </div>
    </div>
    <BookingDetailsModal
      v-if="showDetailsModal"
      :booking="selectedBooking"
      @close="showDetailsModal = false"
    />
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import BookingCard from '../components/BookingCard.vue'
import BookingDetailsModal from '../components/BookingDetailsModal.vue'
import { apiService } from '../services/api'

export default {
  name: 'BookingHistory',
  components: {
    BookingCard,
    BookingDetailsModal
  },
  setup() {
    const bookings = ref([])
    const showDetailsModal = ref(false)
    const selectedBooking = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    const fetchBookings = async () => {
      isLoading.value = true
      error.value = null
      try {
        const fetchedBookings = await apiService.getBookings()
        bookings.value = fetchedBookings.map(booking => ({
          ...booking,
          date: new Date(booking.date)
        }))
      } catch (err) {
        console.error('Error fetching bookings:', err.message)
        error.value = 'Failed to fetch bookings. Please try again later.'
      } finally {
        isLoading.value = false
      }
    }

    onMounted(fetchBookings)

    const upcomingBookings = computed(() => {
      const now = new Date()
      return bookings.value.filter(booking => new Date(booking.date) > now)
    })

    const pastBookings = computed(() => {
      const now = new Date()
      return bookings.value.filter(booking => new Date(booking.date) <= now)
    })

    const cancelBooking = async (id) => {
      try {
        await apiService.updateBooking(id, { status: 'Cancelled' })
        const index = bookings.value.findIndex(booking => booking.id === id)
        if (index !== -1) {
          bookings.value[index].status = 'Cancelled'
        }
      } catch (err) {
        console.error('Error cancelling booking:', err.message)
        error.value = 'Failed to cancel booking. Please try again later.'
      }
    }

    const viewBookingDetails = (booking) => {
      selectedBooking.value = booking
      showDetailsModal.value = true
    }

    return {
      upcomingBookings,
      pastBookings,
      showDetailsModal,
      selectedBooking,
      cancelBooking,
      viewBookingDetails,
      isLoading,
      error
    }
  }
}
</script>