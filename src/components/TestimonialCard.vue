<template>
  <div class="bg-white rounded-lg shadow-md p-8 text-center transition-all duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1">
    <div class="mb-6">
      <svg class="w-8 h-8 text-blue-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
      </svg>
    </div>
    <p class="text-gray-600 italic mb-6">{{ content }}</p>
    <div class="flex items-center justify-center">
      <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <span class="text-xl font-bold text-blue-600">{{ initials }}</span>
      </div>
      <div class="ml-4 text-left">
        <p class="font-semibold">{{ name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'TestimonialCard',
  props: {
    content: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const initials = computed(() => {
      return props.name
        .split(' ')
        .map(n => n[0])
        .join('')
    })

    return {
      initials
    }
  }
}
</script>