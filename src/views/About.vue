<template>
  <div class="about container mx-auto px-6 py-16">
    <h1 class="text-4xl font-bold mb-8 text-center">About Cleaning EDGE</h1>
    
    <div class="flex flex-col md:flex-row items-center mb-16">
      <div class="md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <img src="@/assets/about-image.jpg" alt="Cleaning team" class="rounded-lg shadow-lg">
      </div>
      <div class="md:w-1/2">
        <h2 class="text-3xl font-bold mb-6">Our Story</h2>
        <p class="text-xl mb-6">Cleaning EDGE was founded with a simple mission: to provide exceptional cleaning services that enhance the quality of life for our clients while maintaining the highest standards of professionalism and environmental responsibility.</p>
        <p class="text-xl">Since our establishment, we've grown to become a trusted name in the cleaning industry, serving both residential and commercial clients with dedication and expertise.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div class="text-center">
        <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
        <div class="text-xl">Happy Clients</div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-bold text-blue-600 mb-2">50+</div>
        <div class="text-xl">Professional Staff</div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-bold text-blue-600 mb-2">5000+</div>
        <div class="text-xl">Projects Completed</div>
      </div>
    </div>

    <div class="bg-gray-100 rounded-lg p-8 mb-16">
      <h2 class="text-3xl font-bold mb-6 text-center">Our Values</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <h3 class="text-xl font-bold mb-4">Quality</h3>
          <p>We maintain the highest standards in all our services, ensuring customer satisfaction.</p>
        </div>
        <div class="text-center">
          <h3 class="text-xl font-bold mb-4">Reliability</h3>
          <p>Our team is committed to delivering consistent, dependable service every time.</p>
        </div>
        <div class="text-center">
          <h3 class="text-xl font-bold mb-4">Sustainability</h3>
          <p>We use eco-friendly products and practices to protect our environment.</p>
        </div>
      </div>
    </div>

    <div class="text-center">
      <h2 class="text-3xl font-bold mb-6">Ready to Experience the Difference?</h2>
      <router-link 
        to="/contact" 
        class="inline-block bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Contact Us Today
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>