<template>
  <router-link v-if="to" :to="to" class="dashboard-card">
    <div class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
      <i :class="['fas', `fa-${icon}`, 'text-4xl text-blue-600 mb-4']"></i>
      <h2 class="text-xl font-semibold">{{ title }}</h2>
    </div>
  </router-link>
  <div v-else @click="$emit('click')" class="dashboard-card cursor-pointer">
    <div class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
      <i :class="['fas', `fa-${icon}`, 'text-4xl text-blue-600 mb-4']"></i>
      <h2 class="text-xl font-semibold">{{ title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    to: {
      type: Object,
      default: null
    }
  }
}
</script>