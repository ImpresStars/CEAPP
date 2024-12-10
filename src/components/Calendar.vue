<template>
  <div class="calendar">
    <div class="flex justify-between items-center mb-4">
      <button 
        @click="previousMonth" 
        class="btn btn-blue"
        :disabled="isLoading"
      >
        &lt; Previous
      </button>
      <h2 class="text-2xl font-bold">{{ currentMonthYear }}</h2>
      <button 
        @click="nextMonth" 
        class="btn btn-blue"
        :disabled="isLoading"
      >
        Next &gt;
      </button>
    </div>
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <LoadingSpinner show message="Loading calendar..." />
    </div>
    <div v-else class="grid grid-cols-7 gap-2">
      <div 
        v-for="day in daysOfWeek" 
        :key="day" 
        class="text-center font-bold"
      >
        {{ day }}
      </div>
      <div 
        v-for="date in calendarDates" 
        :key="date.toISOString()" 
        class="border p-2 min-h-[100px]"
      >
        <div class="text-right">{{ date.getDate() }}</div>
        <div 
          v-for="booking in getBookingsForDate(date)" 
          :key="booking.id" 
          class="text-sm mt-1 p-1 rounded cursor-pointer" 
          :class="getBookingClass(booking)"
          @click="viewBookingDetails(booking)"
        >
          {{ booking.serviceType }}
        </div>
      </div>
    </div>
    <BookingDetailsModal 
      v-if="showDetailsModal" 
      :booking="selectedBooking" 
      @close="showDetailsModal = false" 
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import BookingDetailsModal from './BookingDetailsModal.vue'
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  name: 'Calendar',
  components: {
    BookingDetailsModal,
    LoadingSpinner
  },
  props: {
    bookings: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['error'],
  setup(props, { emit }) {
    const currentDate = ref(new Date())
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const showDetailsModal = ref(false)
    const selectedBooking = ref(null)
    const isLoading = ref(true)

    const currentMonthYear = computed(() => {
      try {
        return currentDate.value.toLocaleString('default', { 
          month: 'long', 
          year: 'numeric' 
        })
      } catch (err) {
        emit('error', new Error('Failed to format date'))
        return ''
      }
    })

    const calendarDates = computed(() => {
      try {
        const year = currentDate.value.getFullYear()
        const month = currentDate.value.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const dates = []

        for (let i = 0; i < firstDay.getDay(); i++) {
          dates.push(new Date(year, month, -i))
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
          dates.push(new Date(year, month, i))
        }
        return dates
      } catch (err) {
        emit('error', new Error('Failed to generate calendar dates'))
        return []
      }
    })

    const getBookingsForDate = (date) => {
      try {
        if (!Array.isArray(props.bookings)) return []
        
        return props.bookings.filter(booking => {
          const bookingDate = new Date(booking.date)
          return bookingDate.getDate() === date.getDate() &&
                 bookingDate.getMonth() === date.getMonth() &&
                 bookingDate.getFullYear() === date.getFullYear()
        })
      } catch (err) {
        emit('error', new Error('Failed to filter bookings'))
        return []
      }
    }

    const getBookingClass = (booking) => {
      try {
        const now = new Date()
        const bookingDate = new Date(booking.date)
        const isPast = bookingDate < now

        switch (booking.status) {
          case 'Completed':
            return 'bg-green-200 text-green-800'
          case 'Scheduled':
            return isPast ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'
          case 'Cancelled':
            return 'bg-red-200 text-red-800'
          default:
            return 'bg-gray-200 text-gray-800'
        }
      } catch (err) {
        emit('error', new Error('Failed to determine booking class'))
        return 'bg-gray-200 text-gray-800'
      }
    }

    const previousMonth = () => {
      try {
        currentDate.value = new Date(
          currentDate.value.getFullYear(), 
          currentDate.value.getMonth() - 1, 
          1
        )
      } catch (err) {
        emit('error', new Error('Failed to navigate to previous month'))
      }
    }

    const nextMonth = () => {
      try {
        currentDate.value = new Date(
          currentDate.value.getFullYear(), 
          currentDate.value.getMonth() + 1, 
          1
        )
      } catch (err) {
        emit('error', new Error('Failed to navigate to next month'))
      }
    }

    const viewBookingDetails = (booking) => {
      try {
        selectedBooking.value = booking
        showDetailsModal.value = true
      } catch (err) {
        emit('error', new Error('Failed to view booking details'))
      }
    }

    onMounted(() => {
      try {
        // Initialize calendar
        isLoading.value = false
      } catch (err) {
        emit('error', new Error('Failed to initialize calendar'))
      }
    })

    return {
      currentMonthYear,
      daysOfWeek,
      calendarDates,
      getBookingsForDate,
      getBookingClass,
      previousMonth,
      nextMonth,
      showDetailsModal,
      selectedBooking,
      viewBookingDetails,
      isLoading
    }
  }
}
</script>