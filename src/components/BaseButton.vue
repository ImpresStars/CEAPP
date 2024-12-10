<template>
  <button
    :type="type"
    :class="[
      'px-4 py-2 rounded font-semibold transition-colors duration-200',
      colorClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    color: {
      type: String,
      default: 'blue'
    },
    size: {
      type: String,
      default: 'md'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    colorClasses() {
      const classes = {
        blue: 'bg-blue-600 text-white hover:bg-blue-700',
        red: 'bg-red-600 text-white hover:bg-red-700',
        green: 'bg-green-600 text-white hover:bg-green-700',
        gray: 'bg-gray-600 text-white hover:bg-gray-700'
      }
      return classes[this.color] || classes.blue
    },
    sizeClasses() {
      const classes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
      }
      return classes[this.size] || classes.md
    }
  },
  emits: ['click']
}
</script>