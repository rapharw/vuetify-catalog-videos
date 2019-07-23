import Vue from 'vue'
import Vuex from 'vuex'

import usuario from './usuario-store'
import common from './common-store'
import video from './video-store'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    usuario,
    common,
    video
  }
})