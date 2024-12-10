<template>
  <div class="payment-methods container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Your Payment Methods</h1>
    <div v-if="paymentMethods.length > 0">
      <div v-for="method in paymentMethods" :key="method.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 class="text-xl font-semibold mb-2">{{ method.cardType }} ending in {{ method.last4 }}</h2>
        <p>Expires: {{ method.expirationMonth }}/{{ method.expirationYear }}</p>
        <div class="mt-2">
          <BaseButton @click="editPaymentMethod(method)" class="mr-2">Edit</BaseButton>
          <BaseButton @click="deletePaymentMethod(method.id)" color="red">Delete</BaseButton>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-600">
      You haven't added any payment methods yet.
    </div>
    <BaseButton @click="showPaymentModal = true" class="mt-4">Add New Payment Method</BaseButton>
    <PaymentMethodModal
      v-if="showPaymentModal"
      :paymentMethod="currentPaymentMethod"
      @save="savePaymentMethod"
      @close="showPaymentModal = false"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import PaymentMethodModal from '../components/PaymentMethodModal.vue'

export default {
  name: 'PaymentMethods',
  components: {
    BaseButton,
    PaymentMethodModal
  },
  setup() {
    const paymentMethods = ref([])
    const showPaymentModal = ref(false)
    const currentPaymentMethod = ref(null)

    const editPaymentMethod = (method) => {
      currentPaymentMethod.value = { ...method }
      showPaymentModal.value = true
    }

    const deletePaymentMethod = (id) => {
      // Implement payment method deletion logic here
      paymentMethods.value = paymentMethods.value.filter(method => method.id !== id)
    }

    const savePaymentMethod = (method) => {
      if (method.id) {
        // Update existing payment method
        const index = paymentMethods.value.findIndex(m => m.id === method.id)
        paymentMethods.value[index] = method
      } else {
        // Add new payment method
        method.id = Date.now() // Simple id generation
        paymentMethods.value.push(method)
      }
      showPaymentModal.value = false
    }

    return {
      paymentMethods,
      showPaymentModal,
      currentPaymentMethod,
      editPaymentMethod,
      deletePaymentMethod,
      savePaymentMethod
    }
  }
}
</script>