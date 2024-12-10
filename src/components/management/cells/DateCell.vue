<template>
  <span>{{ formattedDate }}</span>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'DateCell',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const formattedDate = computed(() => {
      return new Date(props.value).toLocaleString()
    })

    return {
      formattedDate
    }
  }
}
</script>