<template>
  <BaseModal :show="true" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ paymentMethod && paymentMethod.id ? 'Edit Payment Method' : 'Add New Payment Method' }}
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="savePaymentMethod">
        <BaseInput v-model="form.cardNumber" id="cardNumber" label="Card Number" />
        <BaseInput v-model="form.cardholderName" id="cardholderName" label="Cardholder Name" />
        <div class="flex space-x-4">
          <BaseInput v-model="form.expirationMonth" id="expirationMonth" label="Expiration Month" type="number" min="1" max="12" />
          <BaseInput v-model="form.expirationYear" id="expirationYear" label="Expiration Year" type="number" min="2023" max="2100" />
        </div>
        <BaseInput v-model="form.cvv" id="cvv" label="CVV" type="password" maxlength="4" />
        <div class="mt-4 flex justify-end">
          <BaseButton type="submit">Save Payment Method</BaseButton>
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<script>
import { ref, onMounted } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'

export default {
  name: 'PaymentMethodModal',
  components: {
    BaseModal,
    BaseInput,
    BaseButton
  },
  props: {
    paymentMethod: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const form = ref({
      cardNumber: '',
      cardholderName: '',
      expirationMonth: '',
      expirationYear: '',
      cvv: ''
    })

    onMounted(() => {
      if (props.paymentMethod && props.paymentMethod.id) {
        form.value = { ...props.paymentMethod }
      }
    })

    const savePaymentMethod = () => {
      const last4 = form.value.cardNumber.slice(-4)
      const cardType = getCardType(form.value.cardNumber)
      emit('save', { ...form.value, id: props.paymentMethod ? props.paymentMethod.id : null, last4, cardType })
    }

    const getCardType = (cardNumber) => {
      // Implement logic to determine card type based on the number
      // This is a simplified version and should be replaced with a more robust solution
      if (cardNumber.startsWith('4')) return 'Visa'
      if (cardNumber.startsWith('5')) return 'MasterCard'
      if (cardNumber.startsWith('3')) return 'American Express'
      return 'Unknown'
    }

    return {
      form,
      savePaymentMethod
    }
  }
}
</script>