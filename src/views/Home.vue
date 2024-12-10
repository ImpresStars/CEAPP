<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="bg-blue-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-bold mb-4">Welcome to Cleaning EDGE</h1>
        <p class="text-xl mb-8">Professional cleaning services for your home and business</p>
        <router-link 
          to="/contact" 
          class="bg-white text-blue-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors"
        >
          Get Started
        </router-link>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            v-bind="service"
          />
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            v-bind="testimonial"
          />
        </div>
      </div>
    </section>

    <!-- Instagram Feed -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Follow Us on Instagram</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(image, index) in instagramFeed" :key="index" class="aspect-square">
            <img 
              :src="image.url" 
              :alt="image.caption"
              class="w-full h-full object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
            />
          </div>
        </div>
        <div class="text-center mt-8">
          <a 
            href="https://instagram.com/cleaningedge" 
            target="_blank"
            class="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <img src="@/assets/instagram-icon.svg" alt="Instagram" class="w-6 h-6 mr-2" />
            Follow @cleaningedge
          </a>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <form @submit.prevent="submitContactForm" class="space-y-6">
            <BaseInput
              v-model="contactForm.name"
              id="name"
              label="Name"
              required
            />
            <BaseInput
              v-model="contactForm.email"
              id="email"
              label="Email"
              type="email"
              required
            />
            <BaseInput
              v-model="contactForm.phone"
              id="phone"
              label="Phone"
              required
            />
            <BaseTextarea
              v-model="contactForm.message"
              id="message"
              label="Message"
              rows="4"
              required
            />
            <div class="text-center">
              <BaseButton type="submit">Send Message</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import ServiceCard from '../components/ServiceCard.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseTextarea from '../components/BaseTextarea.vue'
import BaseButton from '../components/BaseButton.vue'

export default {
  name: 'Home',
  components: {
    ServiceCard,
    TestimonialCard,
    BaseInput,
    BaseTextarea,
    BaseButton
  },
  setup() {
    const services = [
      {
        title: 'House Cleaning',
        description: 'Professional cleaning services for your home, tailored to your needs.',
        icon: 'home'
      },
      {
        title: 'Commercial Cleaning',
        description: 'Keep your business premises spotless with our commercial services.',
        icon: 'building'
      },
      {
        title: 'Vehicle Detailing',
        description: 'Comprehensive cleaning and detailing services for all vehicles.',
        icon: 'car'
      },
      {
        title: 'Post-Construction',
        description: 'Specialized cleaning services for newly constructed properties.',
        icon: 'tools'
      }
    ]

    const testimonials = [
      {
        content: "The team at Cleaning EDGE is professional, thorough, and reliable. They've transformed how my home looks!",
        name: "Sarah Johnson"
      },
      {
        content: "Best commercial cleaning service we've worked with. They understand our needs and deliver consistently.",
        name: "Mike Thompson"
      },
      {
        content: "Their vehicle detailing service is outstanding. My car looks better than when it was new!",
        name: "David Wilson"
      }
    ]

    const instagramFeed = [
      { url: '/img/instagram/cleaning-1.jpg', caption: 'Before and after transformation' },
      { url: '/img/instagram/cleaning-2.jpg', caption: 'Commercial cleaning project' },
      { url: '/img/instagram/cleaning-3.jpg', caption: 'Vehicle detailing results' },
      { url: '/img/instagram/cleaning-4.jpg', caption: 'Our professional team' }
    ]

    const contactForm = ref({
      name: '',
      email: '',
      phone: '',
      message: ''
    })

    const submitContactForm = async () => {
      // Mock form submission
      console.log('Form submitted:', contactForm.value)
      // Reset form
      contactForm.value = {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
      // Show success message (you can implement a toast notification here)
      alert('Thank you for your message. We will contact you soon!')
    }

    return {
      services,
      testimonials,
      instagramFeed,
      contactForm,
      submitContactForm
    }
  }
}
</script>