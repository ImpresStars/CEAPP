<template>
  <div class="bookings container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Your Bookings</h1>
    
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Upcoming Services</h2>
      <BaseButton @click="showBookingModal = true">Book New Service</BaseButton>
    </div>

    <div v-if="isLoading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading bookings...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="upcomingBookings.length > 0">
        <div v-for="booking in upcomingBookings" :key="booking.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
          <BookingCard :booking="booking" @view-details="viewBookingDetails" @cancel="confirmCancelBooking" />
        </div>
      </div>
      <div v-else class="text-center text-gray-600 mb-8">
        You don't have any upcoming bookings.
      </div>

      <h2 class="text-2xl font-bold mb-4">Past Services</h2>
      <div v-if="pastBookings.length > 0">
        <div v-for="booking in pastBookings" :key="booking.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
          <BookingCard :booking="booking" @view-details="viewBookingDetails" />
        </div>
      </div>
      <div v-else class="text-center text-gray-600">
        You don't have any past bookings.
      </div>
    </div>

    <BookingModal
      v-if="showBookingModal"
      :client-addresses="clientAddresses"
      :client-vehicles="clientVehicles"
      @save="handleBookingCreated"
      @close="closeBookingModal"
    />

    <BookingDetailsModal
      v-if="showDetailsModal"
      :booking="selectedBooking"
      @close="closeDetailsModal"
    />

    <ConfirmModal
      v-if="showCancelModal"
      message="Are you sure you want to cancel this booking?"
      @confirm="cancelBooking"
      @cancel="closeCancelModal"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import BookingCard from '../components/BookingCard.vue'
import BookingModal from '../components/BookingModal.vue'
import BookingDetailsModal from '../components/BookingDetailsModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import BaseButton from '../components/BaseButton.vue'

export default {
  name: 'Bookings',
  components: {
    BookingCard,
    BookingModal,
    BookingDetailsModal,
    ConfirmModal,
    BaseButton
  },
  setup() {
    const store = useStore()
    const toast = useToast()
    const showBookingModal = ref(false)
    const showDetailsModal = ref(false)
    const showCancelModal = ref(false)
    const selectedBooking = ref(null)

    const isLoading = computed(() => store.getters['bookings/isLoading'])
    const error = computed(() => store.getters['bookings/error'])
    const upcomingBookings = computed(() => store.getters['bookings/upcomingBookings'])
    const pastBookings = computed(() => store.getters['bookings/pastBookings'])
    const clientAddresses = computed(() => store.getters['addresses/allAddresses'])
    const clientVehicles = computed(() => store.getters['vehicles/allVehicles'])

    const loadBookings = async () => {
      await store.dispatch('bookings/fetchBookings')
    }

    onMounted(async () => {
      await loadBookings()
    })

    const handleBookingCreated = async (booking) => {
      closeBookingModal()
      toast.success('Booking created successfully!')
      await loadBookings()
    }

    const viewBookingDetails = (booking) => {
      selectedBooking.value = booking
      showDetailsModal.value = true
    }

    const confirmCancelBooking = (booking) => {
      selectedBooking.value = booking
      showCancelModal.value = true
    }

    const cancelBooking = async () => {
      if (!selectedBooking.value) return

      const result = await store.dispatch('bookings/cancelBooking', selectedBooking.value.id)
      if (result.success) {
        toast.success('Booking cancelled successfully')
        closeCancelModal()
        await loadBookings()
      } else {
        toast.error(result.error || 'Failed to cancel booking')
      }
    }

    const closeBookingModal = () => {
      showBookingModal.value = false
    }

    const closeDetailsModal = () => {
      showDetailsModal.value = false
      selectedBooking.value = null
    }

    const closeCancelModal = () => {
      showCancelModal.value = false
      selectedBooking.value = null
    }

    return {
      isLoading,
      error,
      upcomingBookings,
      pastBookings,
      clientAddresses,
      clientVehicles,
      showBookingModal,
      showDetailsModal,
      showCancelModal,
      selectedBooking,
      handleBookingCreated,
      viewBookingDetails,
      confirmCancelBooking,
      cancelBooking,
      closeBookingModal,
      closeDetailsModal,
      closeCancelModal
    }
  }
}
</script>