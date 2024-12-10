<template>
  <div class="reports-management">
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Reports & Analytics</h2>
      
      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <BaseSelect
            v-model="filters.dateRange"
            id="dateRange"
            label="Date Range"
            :options="dateRangeOptions"
          />
          <BaseSelect
            v-model="filters.serviceType"
            id="serviceType"
            label="Service Type"
            :options="serviceTypeOptions"
          />
          <BaseSelect
            v-model="filters.location"
            id="location"
            label="Location"
            :options="locationOptions"
          />
          <div class="flex items-end">
            <BaseButton @click="applyFilters" :disabled="isLoading">
              {{ isLoading ? 'Loading...' : 'Apply Filters' }}
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- KPI Cards -->
      <div v-if="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStat
          v-for="stat in dashboardStats"
          :key="stat.title"
          v-bind="stat"
        />
      </div>

      <!-- Loading State -->
      <div v-else class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Charts -->
      <div v-if="!isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div style="height: 300px;">
            <LineChart
              :data="chartData.revenue"
              :options="chartOptions.line"
            />
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4">Service Distribution</h3>
          <div style="height: 300px;">
            <DoughnutChart
              :data="chartData.services"
              :options="chartOptions.doughnut"
            />
          </div>
        </div>
      </div>

      <!-- Data Tables -->
      <div v-if="!isLoading" class="space-y-6">
        <div class="bg-white rounded-lg shadow">
          <div class="p-4 border-b">
            <h3 class="text-lg font-semibold">Revenue by Service</h3>
          </div>
          <div class="overflow-x-auto">
            <DatabaseTable
              tableName="Revenue by Service"
              :columns="tableColumns.revenue"
              :data="tableData.revenue"
              @refresh="refreshData"
            />
          </div>
        </div>

        <div class="bg-white rounded-lg shadow">
          <div class="p-4 border-b">
            <h3 class="text-lg font-semibold">Worker Performance</h3>
          </div>
          <div class="overflow-x-auto">
            <DatabaseTable
              tableName="Worker Performance"
              :columns="tableColumns.workers"
              :data="tableData.workers"
              @refresh="refreshData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { mockApiService } from '../../services/mockApi'
import DashboardStat from '../../components/management/DashboardStat.vue'
import DatabaseTable from '../../components/management/DatabaseTable.vue'
import BaseSelect from '../../components/BaseSelect.vue'
import BaseButton from '../../components/BaseButton.vue'
import { Line as LineChart, Doughnut as DoughnutChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'Reports',
  components: {
    DashboardStat,
    DatabaseTable,
    BaseSelect,
    BaseButton,
    LineChart,
    DoughnutChart
  },
  setup() {
    const isLoading = ref(false)
    const error = ref(null)
    const filters = ref({
      dateRange: 'last30',
      serviceType: 'all',
      location: 'all'
    })

    const metrics = ref({
      totalRevenue: 0,
      revenueGrowth: '',
      totalBookings: 0,
      bookingGrowth: '',
      activeWorkers: 0,
      workerGrowth: '',
      satisfactionRate: 0,
      satisfactionGrowth: ''
    })

    const chartData = ref({
      revenue: {
        labels: [],
        datasets: [{
          label: 'Revenue',
          data: [],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true
        }]
      },
      services: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: ['#2563eb', '#16a34a', '#d97706', '#dc2626']
        }]
      }
    })

    const tableData = ref({
      revenue: [],
      workers: []
    })

    const dateRangeOptions = [
      { value: 'last7', label: 'Last 7 Days' },
      { value: 'last30', label: 'Last 30 Days' },
      { value: 'last90', label: 'Last 90 Days' },
      { value: 'ytd', label: 'Year to Date' }
    ]

    const serviceTypeOptions = [
      { value: 'all', label: 'All Services' },
      { value: 'house', label: 'House Cleaning' },
      { value: 'commercial', label: 'Commercial Cleaning' },
      { value: 'vehicle', label: 'Vehicle Detailing' }
    ]

    const locationOptions = [
      { value: 'all', label: 'All Locations' },
      { value: 'north', label: 'North Region' },
      { value: 'south', label: 'South Region' },
      { value: 'east', label: 'East Region' },
      { value: 'west', label: 'West Region' }
    ]

    const tableColumns = {
      revenue: [
        { key: 'service', label: 'Service Type', type: 'text' },
        { key: 'bookings', label: 'Total Bookings', type: 'number' },
        { key: 'revenue', label: 'Revenue', type: 'currency' },
        { key: 'avgValue', label: 'Avg. Booking Value', type: 'currency' },
        { key: 'growth', label: 'Growth', type: 'percentage' }
      ],
      workers: [
        { key: 'name', label: 'Worker Name', type: 'text' },
        { key: 'completedJobs', label: 'Completed Jobs', type: 'number' },
        { key: 'rating', label: 'Rating', type: 'decimal' },
        { key: 'efficiency', label: 'Efficiency', type: 'percentage' },
        { key: 'earnings', label: 'Earnings', type: 'currency' }
      ]
    }

    const chartOptions = {
      line: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      },
      doughnut: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    }

    const dashboardStats = computed(() => [
      {
        title: 'Revenue',
        value: `$${metrics.value.totalRevenue.toLocaleString()}`,
        icon: 'dollar-sign',
        trend: metrics.value.revenueGrowth,
        color: 'blue'
      },
      {
        title: 'Bookings',
        value: metrics.value.totalBookings.toString(),
        icon: 'calendar',
        trend: metrics.value.bookingGrowth,
        color: 'green'
      },
      {
        title: 'Active Workers',
        value: metrics.value.activeWorkers.toString(),
        icon: 'users',
        trend: metrics.value.workerGrowth,
        color: 'indigo'
      },
      {
        title: 'Client Satisfaction',
        value: `${metrics.value.satisfactionRate}%`,
        icon: 'smile',
        trend: metrics.value.satisfactionGrowth,
        color: 'yellow'
      }
    ])

    const fetchData = async () => {
      isLoading.value = true
      error.value = null

      try {
        const [bookings, workers] = await Promise.all([
          mockApiService.getTableData('bookings'),
          mockApiService.getTableData('memberEmployeeDetails')
        ])

        // Process bookings data
        const revenueData = processBookingsData(bookings)
        const workerData = processWorkerData(workers, bookings)

        updateMetrics(revenueData, workerData)
        updateChartData(revenueData)
        updateTableData(revenueData, workerData)

      } catch (err) {
        console.error('Error fetching report data:', err)
        error.value = 'Failed to load report data. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    const processBookingsData = (bookings) => {
      // Process bookings data for revenue calculations
      // Implementation details...
      return {
        totalRevenue: 24500,
        growth: 12,
        bookingsCount: 156,
        bookingsGrowth: 15
      }
    }

    const processWorkerData = (workers, bookings) => {
      // Process worker performance data
      // Implementation details...
      return {
        activeCount: 12,
        growth: 2,
        satisfaction: 94,
        satisfactionGrowth: 5
      }
    }

    const updateMetrics = (revenueData, workerData) => {
      metrics.value = {
        totalRevenue: revenueData.totalRevenue,
        revenueGrowth: `+${revenueData.growth}% vs last month`,
        totalBookings: revenueData.bookingsCount,
        bookingGrowth: `+${revenueData.bookingsGrowth}% vs last month`,
        activeWorkers: workerData.activeCount,
        workerGrowth: `+${workerData.growth} this month`,
        satisfactionRate: workerData.satisfaction,
        satisfactionGrowth: `+${workerData.satisfactionGrowth}% vs last month`
      }
    }

    const updateChartData = (revenueData) => {
      // Update chart data based on revenue data
      // Implementation details...
    }

    const updateTableData = (revenueData, workerData) => {
      // Update table data based on processed data
      // Implementation details...
    }

    const applyFilters = () => {
      fetchData()
    }

    const refreshData = () => {
      fetchData()
    }

    onMounted(() => {
      fetchData()
    })

    return {
      isLoading,
      error,
      filters,
      dashboardStats,
      chartData,
      tableData,
      tableColumns,
      chartOptions,
      dateRangeOptions,
      serviceTypeOptions,
      locationOptions,
      applyFilters,
      refreshData
    }
  }
}
</script>