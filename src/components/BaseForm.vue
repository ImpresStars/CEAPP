<template>
  <form @submit.prevent="$emit('submit')" class="space-y-4">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'BaseForm'
}
</script>