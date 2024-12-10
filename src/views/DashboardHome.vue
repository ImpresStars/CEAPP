<template>
  <div class="dashboard-home">
    <h1 class="text-3xl font-bold mb-6">Welcome, {{ userName }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <router-link
        v-for="card in dashboardCards"
        :key="card.to"
        :to="card.to"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
      >
        <div class="flex flex-col items-center text-center">
          <i :class="['fas', `fa-${card.icon}`, 'text-4xl text-blue-600 mb-4']"></i>
          <h3 class="text-xl font-semibold">{{ card.title }}</h3>
        </div>
      </router-link>
    </div>

    <h2 class="text-2xl font-bold mb-4">Upcoming Bookings</h2>
    <Calendar :bookings="bookings" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Calendar from '../components/Calendar.vue'

export default {
  name: 'DashboardHome',
  components: {
    Calendar
  },
  setup() {
    const store = useStore()
    const bookings = ref([])

    const userName = computed(() => {
      const user = store.getters['auth/currentUser']
      return user?.firstName ? `${user.firstName} ${user.lastName}` : 'Guest'
    })

    const dashboardCards = [
      {
        title: 'Book a Service',
        icon: 'calendar-plus',
        to: '/dashboard/bookings'
      },
      {
        title: 'Your Profile',
        icon: 'user',
        to: '/dashboard/profile'
      },
      {
        title: 'Manage Addresses',
        icon: 'home',
        to: '/dashboard/addresses'
      },
      {
        title: 'Manage Vehicles',
        icon: 'car',
        to: '/dashboard/vehicles'
      }
    ]

    onMounted(async () => {
      try {
        const result = await store.dispatch('bookings/fetchBookings')
        if (result.success) {
          bookings.value = result.data
        }
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    })

    return {
      userName,
      dashboardCards,
      bookings
    }
  }
}
</script>