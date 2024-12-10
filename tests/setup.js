import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock vue-router
config.global.mocks = {
  $router: {
    push: vi.fn(),
    replace: vi.fn()
  },
  $route: {
    params: {},
    query: {}
  }
}

// Mock Vuex store
config.global.mocks.$store = {
  state: {},
  commit: vi.fn(),
  dispatch: vi.fn(),
  getters: {}
}

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks()
})