import state from './worker/state'
import mutations from './worker/mutations'
import actions from './worker/actions'
import getters from './worker/getters'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}