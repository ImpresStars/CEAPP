<template>
  <span>${{ formattedValue }}</span>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'CurrencyCell',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const formattedValue = computed(() => {
      return props.value.toFixed(2)
    })

    return {
      formattedValue
    }
  }
}
</script>