<template>
  <div class="bg-white rounded-lg shadow-md p-8 text-center transition-all duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1">
    <div class="w-16 h-16 mx-auto mb-6 text-blue-600 flex items-center justify-center">
      <i :class="['fas', `fa-${icon}`, 'text-4xl']"></i>
    </div>
    <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>