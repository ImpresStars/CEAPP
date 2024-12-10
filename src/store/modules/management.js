import state from './management/state'
import mutations from './management/mutations'
import actions from './management/actions'
import getters from './management/getters'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}