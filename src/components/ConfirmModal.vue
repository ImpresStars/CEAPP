<template>
  <BaseModal :show="true" @close="$emit('cancel')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Confirm Action
      </h3>
    </template>
    <template #body>
      <p>{{ message }}</p>
    </template>
    <template #footer>
      <BaseButton @click="$emit('confirm')" color="red" class="mr-2">Confirm</BaseButton>
      <BaseButton @click="$emit('cancel')" color="gray">Cancel</BaseButton>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

export default {
  name: 'ConfirmModal',
  components: {
    BaseModal,
    BaseButton
  },
  props: {
    message: {
      type: String,
      required: true
    }
  },
  emits: ['confirm', 'cancel']
}
</script>