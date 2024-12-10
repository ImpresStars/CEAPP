<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-blue-600">404</h1>
      <h2 class="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
      <p class="mt-2 text-lg text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
      <div class="mt-6">
        <router-link
          to="/"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Go back home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>