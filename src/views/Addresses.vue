<template>
  <div class="addresses container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Your Addresses</h1>
    
    <div v-if="isLoading" class="text-center py-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading addresses...</p>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <div v-else>
      <div v-if="addresses.length > 0">
        <div v-for="address in addresses" :key="address.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 class="text-xl font-semibold mb-2">{{ address.name }}</h2>
          <p>{{ address.street }}</p>
          <p>{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
          <div class="mt-2">
            <BaseButton @click="editAddress(address)" class="mr-2">Edit</BaseButton>
            <BaseButton @click="confirmDeleteAddress(address.id)" color="red">Delete</BaseButton>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-600">
        You haven't added any addresses yet.
      </div>
    </div>
    
    <BaseButton @click="openAddAddressModal" class="mt-4">Add New Address</BaseButton>
    
    <AddressModal
      v-if="showAddressModal"
      :address="currentAddress"
      :loading="isLoading"
      @save="saveAddress"
      @close="closeAddressModal"
    />
    
    <ConfirmModal
      v-if="showDeleteConfirmModal"
      message="Are you sure you want to delete this address?"
      @confirm="deleteAddress"
      @cancel="showDeleteConfirmModal = false"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import BaseButton from '../components/BaseButton.vue'
import AddressModal from '../components/AddressModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  name: 'Addresses',
  components: {
    BaseButton,
    AddressModal,
    ConfirmModal
  },
  setup() {
    const store = useStore()
    const showAddressModal = ref(false)
    const showDeleteConfirmModal = ref(false)
    const currentAddress = ref(null)
    const addressToDeleteId = ref(null)

    const addresses = computed(() => store.getters['addresses/allAddresses'])
    const isLoading = computed(() => store.getters['addresses/isLoading'])
    const error = computed(() => store.getters['addresses/error'])

    const fetchAddresses = async () => {
      await store.dispatch('addresses/fetchAddresses')
    }

    const openAddAddressModal = () => {
      currentAddress.value = null
      showAddressModal.value = true
    }

    const closeAddressModal = () => {
      showAddressModal.value = false
      currentAddress.value = null
    }

    const editAddress = (address) => {
      currentAddress.value = { ...address }
      showAddressModal.value = true
    }

    const confirmDeleteAddress = (id) => {
      addressToDeleteId.value = id
      showDeleteConfirmModal.value = true
    }

    const saveAddress = async (address) => {
      try {
        let result;
        if (address.id) {
          // Update existing address
          result = await store.dispatch('addresses/updateAddress', { id: address.id, data: address });
        } else {
          // Create a new address
          result = await store.dispatch('addresses/createAddress', address);
        }
    
        if (result && result.success) {
          closeAddressModal();
        } else {
          console.error('Failed to save address:', result?.error);
        }
      } catch (error) {
        console.error('Error saving address:', error);
      }
    };



    const deleteAddress = async () => {
      const result = await store.dispatch('addresses/deleteAddress', addressToDeleteId.value)
      if (result.success) {
        showDeleteConfirmModal.value = false
        addressToDeleteId.value = null
      }
    }

    onMounted(() => {
      fetchAddresses()
    })

    return {
      addresses,
      isLoading,
      error,
      showAddressModal,
      showDeleteConfirmModal,
      currentAddress,
      openAddAddressModal,
      closeAddressModal,
      editAddress,
      confirmDeleteAddress,
      saveAddress,
      deleteAddress
    }
  }
}
</script>