<template>
  <div class="profile container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Your Profile</h1>
    <form @submit.prevent="saveProfile" class="max-w-lg mx-auto">
      <BaseInput
        v-model="form.firstName"
        id="firstName"
        label="First Name"
        required
      />
      <BaseInput
        v-model="form.lastName"
        id="lastName"
        label="Last Name"
        required
      />
      <BaseInput
        v-model="form.email"
        id="email"
        label="Email"
        type="email"
        required
      />
      <BaseInput
        v-model="form.phone"
        id="phone"
        label="Phone Number"
        required
      />
      <div class="mt-4 p-4 bg-gray-50 rounded-lg">
        <div class="mb-4">
          <p><strong>Account Type:</strong> {{ form.accountType }}</p>
          <div v-if="form.accountHistory?.length > 0" class="mt-2">
            <p class="text-sm text-gray-600">Account History:</p>
            <ul class="text-sm text-gray-600 list-disc list-inside ml-4">
              <li v-for="(history, index) in form.accountHistory" :key="index">
                Changed to {{ history.type }} on {{ formatDate(history.timestamp) }}
              </li>
            </ul>
          </div>
        </div>
        <BaseButton 
          v-if="form.accountType === 'Basic'" 
          @click.prevent="upgradeAccount" 
          type="button" 
          class="mt-2"
        >
          Upgrade to Commercial Account
        </BaseButton>
      </div>
      <BaseButton type="submit" class="mt-4 w-full" :disabled="isLoading">
        {{ isLoading ? 'Saving...' : 'Save Profile' }}
      </BaseButton>
    </form>
    <p v-if="saveStatus" :class="['mt-4', 'text-center', saveStatus.success ? 'text-green-600' : 'text-red-600']">
      {{ saveStatus.message }}
    </p>
    <CommercialAgreementModal
      v-if="showAgreementModal"
      @agree="confirmUpgrade"
      @close="showAgreementModal = false"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import CommercialAgreementModal from '../components/CommercialAgreementModal.vue'

export default {
  name: 'Profile',
  components: {
    BaseInput,
    BaseButton,
    CommercialAgreementModal
  },
  setup() {
    const store = useStore()
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      accountType: 'Basic',
      accountHistory: []
    })
    const saveStatus = ref(null)
    const showAgreementModal = ref(false)
    const isLoading = ref(false)

    const formatDate = (timestamp) => {
      return new Date(timestamp).toLocaleString()
    }

    const loadProfile = () => {
      const user = store.getters['auth/currentUser']
      if (user) {
        form.value = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          accountType: user.accountType || 'Basic',
          accountHistory: user.accountHistory || []
        }
      }
    }

    const saveProfile = async () => {
      isLoading.value = true
      saveStatus.value = null

      try {
        const result = await store.dispatch('auth/updateUser', form.value)
        if (result.success) {
          saveStatus.value = {
            success: true,
            message: 'Profile saved successfully!'
          }
        } else {
          throw new Error(result.error || 'Failed to save profile')
        }
      } catch (error) {
        console.error('Error saving profile:', error)
        saveStatus.value = {
          success: false,
          message: error.message || 'An unexpected error occurred. Please try again.'
        }
      } finally {
        isLoading.value = false
      }
    }

    const upgradeAccount = () => {
      showAgreementModal.value = true
    }

    const confirmUpgrade = async () => {
      isLoading.value = true
      saveStatus.value = null

      try {
        const result = await store.dispatch('auth/upgradeToCommercial')
        if (result.success) {
          form.value.accountType = result.data.accountType
          form.value.accountHistory = result.data.accountHistory
          saveStatus.value = {
            success: true,
            message: 'Account upgraded successfully!'
          }
        } else {
          throw new Error(result.error || 'Failed to upgrade account')
        }
      } catch (error) {
        console.error('Error upgrading account:', error)
        saveStatus.value = {
          success: false,
          message: error.message || 'An unexpected error occurred. Please try again.'
        }
      } finally {
        isLoading.value = false
        showAgreementModal.value = false
      }
    }

    onMounted(() => {
      loadProfile()
    })

    return {
      form,
      saveProfile,
      saveStatus,
      upgradeAccount,
      confirmUpgrade,
      showAgreementModal,
      isLoading,
      formatDate
    }
  }
}
</script>