<template>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-6 flex flex-col items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-gray-700">{{ loadingMessage }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LoadingSpinner',
  setup() {
    const store = useStore()

    const isLoading = computed(() => store.getters['loading/isLoading'])
    const loadingMessage = computed(() => store.getters['loading/loadingMessage'])

    return {
      isLoading,
      loadingMessage
    }
  }
}
</script>