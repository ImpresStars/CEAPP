<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center">
      <div :class="`rounded-full p-3 ${colorClasses[color]}`">
        <i :class="`fas fa-${icon} text-white`"></i>
      </div>
      <div class="ml-4">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <p class="text-2xl font-bold">{{ value }}</p>
        <p class="text-sm text-gray-600">{{ trend }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardStat',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    trend: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
  setup() {
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    }

    return {
      colorClasses
    }
  }
}
</script>