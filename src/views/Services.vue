<template>
  <div class="services container mx-auto px-6 py-16">
    <h1 class="text-4xl font-bold mb-8 text-center">Our Services</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="service in services" :key="service.title" 
           class="bg-white rounded-lg shadow-md p-8 text-center">
        <div class="w-16 h-16 mx-auto mb-6 text-blue-600">
          <i :class="['fas', `fa-${service.icon}`, 'text-4xl']"></i>
        </div>
        <h3 class="text-xl font-semibold mb-4">{{ service.title }}</h3>
        <p class="text-gray-600">{{ service.description }}</p>
        <router-link 
          to="/contact" 
          class="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Book Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Services',
  setup() {
    const services = [
      {
        title: 'House Cleaning',
        description: 'Professional cleaning services for your home, tailored to your specific needs.',
        icon: 'home'
      },
      {
        title: 'Commercial Cleaning',
        description: 'Keep your business premises spotless with our commercial cleaning services.',
        icon: 'building'
      },
      {
        title: 'Vehicle Detailing',
        description: 'Comprehensive cleaning and detailing services for all types of vehicles.',
        icon: 'car'
      },
      {
        title: 'Carpet Cleaning',
        description: 'Deep cleaning services for carpets and rugs, removing stains and refreshing fibers.',
        icon: 'broom'
      },
      {
        title: 'Post-Construction',
        description: 'Specialized cleaning services for newly constructed or renovated properties.',
        icon: 'tools'
      },
      {
        title: 'Window Cleaning',
        description: 'Professional window cleaning services for crystal clear views.',
        icon: 'window-maximize'
      }
    ]

    return {
      services
    }
  }
}
</script>