<template>
  <span :class="['px-2 py-1 text-xs rounded-full', value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
    {{ value ? 'Yes' : 'No' }}
  </span>
</template>

<script>
export default {
  name: 'BooleanCell',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>