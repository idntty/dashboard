import Vue from 'vue'

import * as VueDeepSet from 'vue-deepset'

export default {
  /**
   * Common Set mutations
   */
  set (state, { key, value }) {
    Vue.set(state, key, value)
  },

  deepSet: VueDeepSet.VUEX_DEEP_SET
}
