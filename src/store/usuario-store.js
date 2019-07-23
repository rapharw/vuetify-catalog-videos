/* eslint-disable no-unused-vars */
import axios from '@/plugins/axios'
export default {
  state: {
    username: '',
    perfil: [],
    token: window.$cookies.get('token') || '',
    usuario: '',
    isAdmin: false
  },
  mutations: {
    setUserName(state, payload) {
      state.username = payload
    },
    setPerfil(state, payload) {
      state.perfil = payload
    },
    setToken(state, payload) {
      state.token = payload
    },
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setAdmin(state, payload) {
      state.isAdmin = payload
    },
    setPerfilAdmin(state) {
      state.perfil.forEach(element => {
        if (element.includes("ADM")) {
          state.isAdmin = true
        }
      });
    }
  },
  actions: {
    login({
      commit,
      getters
    }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`auth/signin`, payload)
          .then(response => {
            var data = response.data
            window.$cookies.set('token', data.token, '1d')

            commit('setUserName', data.username)
            commit('setPerfil', data.perfil)
            commit('setToken', data.token)
            commit('setPerfilAdmin')
            resolve()
          })
          .catch(e => {
            window.$cookies.remove('token')
            reject(e)
          })
      })
    },
    userRequest({
      commit,
      getters,
      dispatch
    }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`auth/me`)
          .then(response => {
            // var data = response.data
            commit('setUsuario', response.data.cli)
            commit('setPerfil', response.data.perfil)
            commit('setPerfilAdmin')
            dispatch('showSnackSucces', 'Bem vindo(a) ' + getters.usuario.dados.nomePessoa)
            resolve()
          })
      })
    },
    isValidToken() {
      axios.post(`auth/isValidToken`, this.state.usuario)
        .then(response => {
          if (response.data === false) {
            window.$cookies.remove('token')
          }
        }).catch(e => {
          window.$cookies.remove('token')
        })
    },
    logout({
      commit,
      getters,
      state
    }) {
      window.$cookies.remove('token')
      commit('setUserName', '')
      commit('setPerfil', '')
      commit('setToken', '')
      state.isAdmin = false
    }
  },
  getters: {
    username(state) {
      return state.username
    },
    perfil(state) {
      return state.perfil
    },
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return state.token != null && state.token !== ''
    },
    usuario(state) {
      return state.usuario
    },
    isAdmin(state) {
      return state.isAdmin
    },
    firstName(state) {
      let nome = state.usuario.dados !== undefined ? state.usuario.dados.nomePessoa : '';
      return nome !== '' ? nome.split(" ")[0] : '';
    }
  }
}