/* eslint-disable no-unused-vars */
export default {
  state: {
    snackbar: '',
    loading: false
  },
  mutations: {
    setSnackbar(state, payload) {
      state.snackbar = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    showSnackSucces({
      commit
    }, payload) {
      commit('setSnackbar', {
        show: true,
        color: 'success',
        text: payload,
        timeout: 6000
      })
    },
    showSnackError({
      commit
    }, payload) {
      commit('setSnackbar', {
        show: true,
        color: 'error',
        text: payload,
        timeout: 15000
      })
    },
    showSnackWarning({
      commit
    }, payload) {
      commit('setSnackbar', {
        show: true,
        color: 'warning',
        text: payload,
        timeout: 15000
      })
    },
    showSnackWarningWithTimeout({
      commit
    }, payload) {
      commit('setSnackbar', {
        show: true,
        color: 'warning',
        text: payload.text,
        timeout: payload.timeout
      })
    },
    showSnackInfo({
      commit
    }, payload) {
      commit('setSnackbar', {
        show: true,
        color: '#1b365d',
        text: payload,
        timeout: 10000
      })
    }
  },
  getters: {
    snackbar(state) {
      return state.snackbar
    },
    loading(state) {
      return state.loading
    }
  }
}