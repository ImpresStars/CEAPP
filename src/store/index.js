import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import worker from './modules/worker'
import management from './modules/management'
import bookings from './modules/bookings'
import vehicles from './modules/vehicles'
import addresses from './modules/addresses'
import settings from './modules/settings'
import error from './modules/error'
import loading from './modules/loading'
import workers from './modules/workers'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    worker,
    management,
    bookings,
    vehicles,
    addresses,
    settings,
    error,
    loading,
    workers
  },
  plugins: [
    createPersistedState({
      key: 'cleaning-edge-state',
      paths: [
        'auth.user',
        'worker.worker',
        'management.user',
        'vehicles',
        'addresses',
        'bookings',
        'settings'
      ]
    })
  ]
})

export default store