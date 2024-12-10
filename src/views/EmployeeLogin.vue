<template>
  <div class="employee-login min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-2xl font-bold mb-6 text-center">Employee Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="employee-id">
            Employee ID
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employee-id" type="text" placeholder="Employee ID" v-model="employeeId" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="employee-password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="employee-password" type="password" placeholder="******************" v-model="password" required>
        </div>
        <div class="flex items-center justify-between">
          <button class="btn btn-blue w-full" type="submit">
            Sign In
          </button>
        </div>
      </form>
      <div class="mt-4 text-center">
        <router-link to="/" class="text-blue-600 hover:text-blue-800">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeLogin',
  data() {
    return {
      employeeId: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      // Implement employee login logic here
      console.log('Employee login', this.employeeId, this.password)
    }
  }
}
</script>