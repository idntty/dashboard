import state from './state.js'
import getters from './getters.js'
import moduleMutations from './mutations.js'
import commonMutations from '../common-mutations.js'
import * as actions from './actions.js'


const mutations = {
  ...commonMutations,
  ...moduleMutations
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
