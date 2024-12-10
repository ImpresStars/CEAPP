<template>
  <div>
    <component 
      :is="getCellComponent"
      :value="value"
      :type="type"
    />
  </div>
</template>

<script>
import TextCell from './cells/TextCell.vue'
import DateCell from './cells/DateCell.vue'
import BooleanCell from './cells/BooleanCell.vue'
import CurrencyCell from './cells/CurrencyCell.vue'
import ArrayCell from './cells/ArrayCell.vue'

export default {
  name: 'DatabaseCell',
  components: {
    TextCell,
    DateCell,
    BooleanCell,
    CurrencyCell,
    ArrayCell
  },
  props: {
    value: {
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    getCellComponent() {
      switch (this.type) {
        case 'date':
          return 'DateCell'
        case 'boolean':
          return 'BooleanCell'
        case 'currency':
          return 'CurrencyCell'
        case 'array':
          return 'ArrayCell'
        default:
          return 'TextCell'
      }
    }
  }
}
</script>