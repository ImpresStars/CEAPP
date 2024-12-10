<template>
  <div class="contact container mx-auto px-6 py-16">
    <h1 class="text-4xl font-bold mb-8 text-center">Contact Us</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 class="text-2xl font-bold mb-6">Get in Touch</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">Address</h3>
            <p>123 Cleaning Street</p>
            <p>Sparkle City, SC 12345</p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">Phone</h3>
            <p>Main: (555) 123-4567</p>
            <p>Support: (555) 987-6543</p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">Email</h3>
            <p>info@cleaningedge.com</p>
            <p>support@cleaningedge.com</p>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Business Hours</h3>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-6">Send Us a Message</h2>
        <form @submit.prevent="submitForm" class="space-y-6">
          <BaseInput
            v-model="form.name"
            id="name"
            label="Name"
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
            label="Phone"
            required
          />
          
          <BaseSelect
            v-model="form.service"
            id="service"
            label="Service Interested In"
            :options="serviceOptions"
            required
          />
          
          <BaseTextarea
            v-model="form.message"
            id="message"
            label="Message"
            rows="4"
            required
          />
          
          <BaseButton 
            type="submit"
            :disabled="isLoading"
            class="w-full"
          >
            {{ isLoading ? 'Sending...' : 'Send Message' }}
          </BaseButton>
        </form>

        <div v-if="error" class="mt-4 text-red-600 text-center">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import BaseInput from '../components/BaseInput.vue'
import BaseSelect from '../components/BaseSelect.vue'
import BaseTextarea from '../components/BaseTextarea.vue'
import BaseButton from '../components/BaseButton.vue'

export default {
  name: 'Contact',
  components: {
    BaseInput,
    BaseSelect,
    BaseTextarea,
    BaseButton
  },
  setup() {
    const toast = useToast()
    const isLoading = ref(false)
    const error = ref(null)

    const form = ref({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    })

    const serviceOptions = [
      { value: 'residential', label: 'Residential Cleaning' },
      { value: 'commercial', label: 'Commercial Cleaning' },
      { value: 'vehicle', label: 'Vehicle Detailing' },
      { value: 'carpet', label: 'Carpet Cleaning' },
      { value: 'construction', label: 'Post-Construction Cleaning' },
      { value: 'other', label: 'Other Services' }
    ]

    const submitForm = async () => {
      isLoading.value = true
      error.value = null

      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Reset form
        form.value = {
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        }

        toast.success('Message sent successfully! We will contact you soon.')
      } catch (err) {
        console.error('Error sending message:', err)
        error.value = 'Failed to send message. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    return {
      form,
      serviceOptions,
      isLoading,
      error,
      submitForm
    }
  }
}
</script>