import {
  store
} from '@/store'
import router from '@/router'
import Axios from 'axios'
import Vue from "vue";

const instance = Axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

instance.interceptors.request.use(
  (config) => {
    if (!config.url.includes('/signin')) {
      store.commit('setLoading', true)
    }
    config.headers['Authorization'] = `Bearer ` + Vue.cookies.get("token")
    // config.baseURL = API_URL
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    setTimeout(function () {
      store.commit('setLoading', false)
    }, 1000)

    return response
  },
  function (error) {

    store.commit('setLoading', false);

    const status = error.response ? error.response.status : null
    const config = error.config

    if (!config.url.includes('/signin') || !config.url.includes('/public')) {

      if (status === 403 || status === 401 || status === null) {

        store.dispatch('showSnackError', 'Usuário não autorizado')
        router.push({
          name: 'Login'
        })

      } else {

        if (status === 500 && error.response.data !== undefined && error.response.data !== null && error.response.data.mensagem !== undefined) {
          store.dispatch('showSnackError', error.response.data.mensagem)
        } else {
          store.dispatch('showSnackError', 'Ocorreu um erro interno. Tente novamente mais tarde.')
        }

        store.commit('setLoading', false)
      }
    }
    return Promise.reject(error)
  })

export default instance