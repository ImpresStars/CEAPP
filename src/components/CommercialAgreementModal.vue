<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Commercial Account Agreement
      </h3>
    </template>
    <template #body>
      <div class="prose">
        <p>By upgrading to a Commercial Account, you agree to the following terms:</p>
        <ul>
          <li>Access to recurring commercial cleaning services</li>
          <li>Access to post-construction cleaning services</li>
          <li>Minimum contract duration of 6 months</li>
          <li>Higher priority scheduling for all services</li>
          <li>This upgrade cannot be reverted once confirmed</li>
        </ul>
        <p>Do you agree to these terms and wish to upgrade your account?</p>
      </div>
    </template>
    <template #footer>
      <BaseButton @click="$emit('agree')" color="blue" class="mr-2">I Agree</BaseButton>
      <BaseButton @click="$emit('close')" color="gray">Cancel</BaseButton>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

export default {
  name: 'CommercialAgreementModal',
  components: {
    BaseModal,
    BaseButton
  },
  emits: ['agree', 'close']
}
</script>