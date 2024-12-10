<template>
  <div class="flex flex-wrap gap-1">
    <span
      v-for="(item, index) in value"
      :key="index"
      class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
    >
      {{ item }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ArrayCell',
  props: {
    value: {
      type: Array,
      required: true
    }
  }
}
</script>