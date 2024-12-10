<template>
  <div class="database-table">
    <!-- Table Header with Search and Controls -->
    <div class="bg-white p-4 border-b flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <h3 class="text-lg font-semibold">{{ tableName }}</h3>
        <BaseInput
          v-model="searchQuery"
          id="tableSearch"
          placeholder="Search..."
          class="w-64"
        />
      </div>
      <div class="flex items-center space-x-2">
        <BaseSelect
          v-model="rowsPerPage"
          id="rowsPerPage"
          :options="[
            { value: 10, label: '10 rows' },
            { value: 25, label: '25 rows' },
            { value: 50, label: '50 rows' },
            { value: 100, label: '100 rows' }
          ]"
          class="w-32"
        />
        <BaseButton @click="$emit('add')" color="green">
          <i class="fas fa-plus mr-2"></i> Add New
        </BaseButton>
        <BaseButton @click="$emit('refresh')">
          <i class="fas fa-sync-alt mr-2"></i> Refresh
        </BaseButton>
        <BaseButton @click="exportToCSV">
          <i class="fas fa-download mr-2"></i> Export
        </BaseButton>
      </div>
    </div>

    <!-- Table Content -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              @click="sortBy(column.key)"
            >
              <div class="flex items-center">
                {{ column.label }}
                <span v-if="sortColumn === column.key" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </div>
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="record in paginatedData" :key="record.id">
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap"
            >
              <component
                :is="getCellComponent(column.type)"
                :value="record[column.key]"
                :type="column.type"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="$emit('view', record)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                View
              </button>
              <button
                @click="$emit('edit', record)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Edit
              </button>
              <button
                @click="$emit('delete', record)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
      <div class="flex-1 flex justify-between sm:hidden">
        <BaseButton
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          Previous
        </BaseButton>
        <BaseButton
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          Next
        </BaseButton>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ paginationStart }}</span>
            to
            <span class="font-medium">{{ paginationEnd }}</span>
            of
            <span class="font-medium">{{ filteredData.length }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                page === currentPage
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import BaseInput from '../BaseInput.vue'
import BaseSelect from '../BaseSelect.vue'
import BaseButton from '../BaseButton.vue'
import TextCell from './cells/TextCell.vue'
import DateCell from './cells/DateCell.vue'
import BooleanCell from './cells/BooleanCell.vue'
import CurrencyCell from './cells/CurrencyCell.vue'
import ArrayCell from './cells/ArrayCell.vue'

export default {
  name: 'DatabaseTable',
  components: {
    BaseInput,
    BaseSelect,
    BaseButton,
    TextCell,
    DateCell,
    BooleanCell,
    CurrencyCell,
    ArrayCell
  },
  props: {
    tableName: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  emits: ['add', 'edit', 'delete', 'view', 'refresh'],
  setup(props) {
    const searchQuery = ref('')
    const rowsPerPage = ref(10)
    const currentPage = ref(1)
    const sortColumn = ref('id')
    const sortDirection = ref('asc')

    const filteredData = computed(() => {
      let result = [...props.data]
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(record => 
          Object.entries(record).some(([key, value]) => {
            if (value === null || value === undefined) return false
            return String(value).toLowerCase().includes(query)
          })
        )
      }

      if (sortColumn.value) {
        result.sort((a, b) => {
          const aVal = a[sortColumn.value]
          const bVal = b[sortColumn.value]
          const modifier = sortDirection.value === 'asc' ? 1 : -1

          if (aVal === null || aVal === undefined) return 1
          if (bVal === null || bVal === undefined) return -1
          
          if (typeof aVal === 'string') {
            return aVal.localeCompare(bVal) * modifier
          }
          return (aVal - bVal) * modifier
        })
      }

      return result
    })

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage.value
      const end = start + rowsPerPage.value
      return filteredData.value.slice(start, end)
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredData.value.length / rowsPerPage.value)
    })

    const displayedPages = computed(() => {
      const pages = []
      let start = Math.max(1, currentPage.value - 2)
      let end = Math.min(totalPages.value, start + 4)
      
      if (end - start < 4) {
        start = Math.max(1, end - 4)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    })

    const paginationStart = computed(() => {
      return (currentPage.value - 1) * rowsPerPage.value + 1
    })

    const paginationEnd = computed(() => {
      return Math.min(currentPage.value * rowsPerPage.value, filteredData.value.length)
    })

    const sortBy = (column) => {
      if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortColumn.value = column
        sortDirection.value = 'asc'
      }
    }

    const getCellComponent = (type) => {
      switch (type) {
        case 'date':
          return 'DateCell'
        case 'boolean':
          return 'BooleanCell'
        case 'currency':
          return 'CurrencyCell'
        case 'array':
          return 'ArrayCell'
        default:
          return 'TextCell'
      }
    }

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const goToPage = (page) => {
      currentPage.value = page
    }

    const exportToCSV = () => {
      const headers = props.columns.map(col => col.label).join(',')
      const rows = filteredData.value.map(record => 
        props.columns.map(col => {
          const value = record[col.key]
          if (Array.isArray(value)) {
            return `"${value.join(', ')}"`
          }
          return value
        }).join(',')
      )
      const csv = [headers, ...rows].join('\n')
      
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${props.tableName.toLowerCase()}_export.csv`
      link.click()
      window.URL.revokeObjectURL(url)
    }

    return {
      searchQuery,
      rowsPerPage,
      currentPage,
      sortColumn,
      sortDirection,
      filteredData,
      paginatedData,
      totalPages,
      displayedPages,
      paginationStart,
      paginationEnd,
      sortBy,
      getCellComponent,
      previousPage,
      nextPage,
      goToPage,
      exportToCSV
    }
  }
}
</script>