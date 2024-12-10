<template>
  <div v-if="hasError" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <h3 class="text-lg font-medium text-red-600 mb-4">An Error Occurred</h3>
      <p class="text-gray-700 mb-4">{{ errorMessage }}</p>
      <div class="flex justify-end">
        <button
          @click="handleRetry"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Retry
        </button>
        <button
          @click="handleDismiss"
          class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Dismiss
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'ErrorBoundary',
  setup() {
    const store = useStore()
    const router = useRouter()

    const hasError = computed(() => store.getters['error/hasError'])
    const errorMessage = computed(() => store.getters['error/errorMessage'])

    const handleRetry = () => {
      store.dispatch('error/clearError')
      router.go(0) // Refresh current route
    }

    const handleDismiss = () => {
      store.dispatch('error/clearError')
    }

    return {
      hasError,
      errorMessage,
      handleRetry,
      handleDismiss
    }
  }
}
</script>