<template>
  <div class="settings-management">
    <h2 class="text-2xl font-bold mb-6">System Settings</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Service Settings -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Service Settings</h3>
        <form @submit.prevent="saveServiceSettings" class="space-y-4">
          <div class="border-b pb-4">
            <h4 class="text-md font-medium mb-3">Calendar Settings</h4>
            <BaseInput
              v-model="serviceSettings.minAdvanceHours"
              id="minAdvanceHours"
              label="Minimum Advance Hours"
              type="number"
              min="1"
              required
            />
            <BaseInput
              v-model="serviceSettings.maxAdvanceDays"
              id="maxAdvanceDays"
              label="Maximum Advance Days"
              type="number"
              min="1"
              required
            />
          </div>
          
          <div class="border-b pb-4">
            <h4 class="text-md font-medium mb-3">Service Hours</h4>
            <div class="grid grid-cols-2 gap-4">
              <BaseInput
                v-model="serviceSettings.startTime"
                id="startTime"
                label="Start Time"
                type="time"
                required
              />
              <BaseInput
                v-model="serviceSettings.endTime"
                id="endTime"
                label="End Time"
                type="time"
                required
              />
            </div>
          </div>

          <div>
            <h4 class="text-md font-medium mb-3">Service Availability</h4>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="serviceSettings.weekendService"
                  class="form-checkbox h-4 w-4 text-blue-600"
                />
                <span class="ml-2">Allow Weekend Service</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="serviceSettings.holidayService"
                  class="form-checkbox h-4 w-4 text-blue-600"
                />
                <span class="ml-2">Allow Holiday Service</span>
              </label>
            </div>
          </div>

          <BaseButton type="submit">Save Service Settings</BaseButton>
        </form>
      </div>

      <!-- Pricing Settings -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Pricing Settings</h3>
        <form @submit.prevent="savePricingSettings" class="space-y-4">
          <div v-for="service in pricingSettings.services" :key="service.type">
            <BaseInput
              v-model="service.basePrice"
              :id="'price-' + service.type"
              :label="service.name"
              type="number"
              step="0.01"
              required
            />
          </div>
          <BaseButton type="submit">Save Pricing Settings</BaseButton>
        </form>
      </div>

      <!-- Worker Settings -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Worker Settings</h3>
        <form @submit.prevent="saveWorkerSettings" class="space-y-4">
          <BaseInput
            v-model="workerSettings.maxDailyBookings"
            id="maxDailyBookings"
            label="Maximum Daily Bookings per Worker"
            type="number"
            min="1"
            required
          />
          <BaseInput
            v-model="workerSettings.breakTimeMins"
            id="breakTimeMins"
            label="Break Time Between Services (minutes)"
            type="number"
            min="0"
            required
          />
          <BaseButton type="submit">Save Worker Settings</BaseButton>
        </form>
      </div>

      <!-- Client Settings -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Client Settings</h3>
        <form @submit.prevent="saveClientSettings" class="space-y-4">
          <BaseInput
            v-model="clientSettings.maxActiveBookings"
            id="maxActiveBookings"
            label="Maximum Active Bookings per Client"
            type="number"
            min="1"
            required
          />
          <BaseInput
            v-model="clientSettings.cancellationHours"
            id="cancellationHours"
            label="Cancellation Notice Required (hours)"
            type="number"
            min="0"
            required
          />
          <BaseButton type="submit">Save Client Settings</BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'

export default {
  name: 'Settings',
  components: {
    BaseInput,
    BaseButton
  },
  setup() {
    const store = useStore()

    const serviceSettings = ref({
      minAdvanceHours: 48,
      maxAdvanceDays: 30,
      startTime: '08:00',
      endTime: '18:00',
      weekendService: false,
      holidayService: false
    })

    const pricingSettings = ref({
      services: [
        { type: 'house', name: 'House Cleaning (per hour)', basePrice: 50 },
        { type: 'commercial', name: 'Commercial Cleaning (per hour)', basePrice: 75 },
        { type: 'vehicle', name: 'Vehicle Detailing (base price)', basePrice: 100 },
        { type: 'carpet', name: 'Carpet Cleaning (per room)', basePrice: 60 }
      ]
    })

    const workerSettings = ref({
      maxDailyBookings: 8,
      breakTimeMins: 30
    })

    const clientSettings = ref({
      maxActiveBookings: 3,
      cancellationHours: 24
    })

    const saveServiceSettings = async () => {
      try {
        await store.dispatch('settings/saveServiceSettings', serviceSettings.value)
      } catch (error) {
        console.error('Error saving service settings:', error)
      }
    }

    const savePricingSettings = async () => {
      try {
        await store.dispatch('settings/savePricingSettings', pricingSettings.value)
      } catch (error) {
        console.error('Error saving pricing settings:', error)
      }
    }

    const saveWorkerSettings = async () => {
      try {
        await store.dispatch('settings/saveWorkerSettings', workerSettings.value)
      } catch (error) {
        console.error('Error saving worker settings:', error)
      }
    }

    const saveClientSettings = async () => {
      try {
        await store.dispatch('settings/saveClientSettings', clientSettings.value)
      } catch (error) {
        console.error('Error saving client settings:', error)
      }
    }

    return {
      serviceSettings,
      pricingSettings,
      workerSettings,
      clientSettings,
      saveServiceSettings,
      savePricingSettings,
      saveWorkerSettings,
      saveClientSettings
    }
  }
}
</script>