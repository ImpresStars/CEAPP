<template>
  <div class="worker-paystubs container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Paystubs & Tax Documents</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-semibold mb-4">Recent Paystubs</h2>
        <div class="bg-white rounded-lg shadow-md p-6">
          <div v-for="paystub in paystubs" :key="paystub.id" class="mb-4 p-4 border-b last:border-b-0">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-semibold">Pay Period: {{ paystub.period }}</h3>
                <p class="text-sm text-gray-600">Gross Amount: ${{ paystub.amount.toFixed(2) }}</p>
                <p class="text-sm text-gray-600">Taxes: ${{ paystub.taxes.toFixed(2) }}</p>
                <p class="text-sm font-semibold">Net Pay: ${{ paystub.net.toFixed(2) }}</p>
              </div>
              <BaseButton @click="downloadPaystub(paystub.id)">
                Download
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-4">Tax Documents</h2>
        <div class="bg-white rounded-lg shadow-md p-6">
          <div v-for="doc in taxDocuments" :key="doc.id" class="mb-4 p-4 border-b last:border-b-0">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-semibold">{{ doc.name }}</h3>
                <p class="text-sm text-gray-600">Tax Year: {{ doc.year }}</p>
                <p class="text-sm text-gray-600">Date Available: {{ formatDate(doc.dateAvailable) }}</p>
              </div>
              <BaseButton @click="downloadTaxDocument(doc.id)">
                Download
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import BaseButton from '../../components/BaseButton.vue'
import { apiService } from '../../services/api'

export default {
  name: 'WorkerPaystubs',
  components: {
    BaseButton
  },
  setup() {
    const paystubs = ref([])
    const taxDocuments = ref([
      {
        id: 1,
        name: 'W-2 Form',
        year: 2022,
        dateAvailable: '2023-01-31',
        type: 'W2'
      },
      {
        id: 2,
        name: '1099 Form',
        year: 2022,
        dateAvailable: '2023-01-31',
        type: '1099'
      }
    ])

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    const downloadPaystub = (paystubId) => {
      console.log('Downloading paystub:', paystubId)
      // Implement paystub download logic
    }

    const downloadTaxDocument = (docId) => {
      console.log('Downloading tax document:', docId)
      // Implement tax document download logic
    }

    onMounted(async () => {
      try {
        const result = await apiService.workerLogin('W001', 'worker123')
        if (!result.error) {
          paystubs.value = result.data.paystubs
        }
      } catch (error) {
        console.error('Error fetching paystubs:', error)
      }
    })

    return {
      paystubs,
      taxDocuments,
      formatDate,
      downloadPaystub,
      downloadTaxDocument
    }
  }
}
</script>