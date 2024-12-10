<template>
  <div class="bg-white rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out hover:shadow-lg">
    <h3 class="text-lg font-semibold mb-2">{{ task.title }}</h3>
    <p class="text-gray-600 mb-4">{{ task.description }}</p>
    <div class="flex justify-between items-center">
      <span :class="['px-2 py-1 rounded-full text-sm', statusClass]">{{ task.status }}</span>
      <BaseButton @click="$emit('complete')" :disabled="task.status === 'Completed'" color="green">
        Complete
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  name: 'TaskCard',
  components: {
    BaseButton
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusClass() {
      switch (this.task.status) {
        case 'Pending':
          return 'bg-yellow-200 text-yellow-800'
        case 'In Progress':
          return 'bg-blue-200 text-blue-800'
        case 'Completed':
          return 'bg-green-200 text-green-800'
        default:
          return 'bg-gray-200 text-gray-800'
      }
    }
  }
}
</script>