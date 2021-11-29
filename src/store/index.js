import { createStore } from 'vuex'

import axios from 'axios'

export default createStore({
  state: {
    user: null,
    transactions: []
  },
  mutations: {
    resetUser(state) {
      state.user = null
    },
    setUser(state, loggedInUser) {
      state.user = loggedInUser
    }
  },
  getters: {
    totalTransactionsFilter: (state, getters) => (type, category) => {
    },
  },
  actions: {
    async login(context, credentials) {
      try {
        let response = await axios.post('login', credentials)
        axios.defaults.headers.common.Authorization = "Bearer " + response.data.access_token
        sessionStorage.setItem('token', response.data.access_token)
      } catch (error) {
        delete axios.defaults.headers.common.Authorization
        sessionStorage.removeItem('token')
        context.commit('resetUser', null)
        throw error
      }
      await context.dispatch('refresh')
    },
    async logout(context) {
      try {
        await axios.post('logout')
      }
      finally {
        delete axios.defaults.headers.common.Authorization
        sessionStorage.removeItem('token')
        context.commit('resetUser', null)
      }
    },
    async restoreToken(context) {
      let storedToken = sessionStorage.getItem('token')
      if (storedToken) {
        axios.defaults.headers.common.Authorization = "Bearer " + storedToken
        return storedToken
      }
      delete axios.defaults.headers.common.Authorization
      context.commit('resetUser', null)
      return null
    },
    async loadLoggedInUser(context) {
      try {
        let response = await axios.get('users/me')
        context.commit('setUser', response.data.data)
      } catch (error) {
        delete axios.defaults.headers.common.Authorization
        context.commit('resetUser', null)
        throw error
      }
    },
    async refresh(context) {
      let userPromise = context.dispatch('loadLoggedInUser')

      await userPromise
    },
  },
})

