<template>
  <Transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 shadow-xl">
        <div class="flex items-center space-x-4">
          <div class="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p class="text-lg font-medium text-gray-900">{{ loadingMessage }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LoadingOverlay',
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>