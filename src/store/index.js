import { createStore } from "vuex"

import axios from "axios"

export default createStore({
  state: {
    user: null,
    vcard: null,
    transactions: [],
    paymentTypes: [],
    categories: [],
  },
  mutations: {
    resetUser(state) {
      if (state.user) {
        this.$socket.emit("logged_out", state.user)
        state.user = null
      }
    },
    setUser(state, loggedInUser) {
      state.user = loggedInUser
    },
    setPaymentTypes(state, paymentTypes) {
      state.paymentTypes = paymentTypes
    },
    resetPaymentTypes(state) {
      state.paymentTypes = null
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    resetCategories(state) {
      state.categories = null
    },
    setVcard(state, vcard) {
      state.vcard = vcard
    },
    resetVcard(state) {
      state.vcard = null
    },
    setTransactions(state, transations) {
      state.transactions = transations
    },
    resetTransactions(state) {
      state.transations = null
    },
  },
  getters: {
    paymentTypes: (state) => {
      return state.paymentTypes
    },
    categories: (state) => {
      return state.categories
    },
  },
  actions: {
    async login(context, credentials) {
      try {
        let response = await axios.post("login", credentials)
        axios.defaults.headers.common.Authorization =
          "Bearer " + response.data.access_token
        sessionStorage.setItem("token", response.data.access_token)
      } catch (error) {
        delete axios.defaults.headers.common.Authorization
        sessionStorage.removeItem("token")
        context.commit("resetUser", null)
        throw error
      }
      await context.dispatch("refresh")
    },
    async logout(context) {
      try {
        await axios.post("logout")
      } finally {
        delete axios.defaults.headers.common.Authorization
        sessionStorage.removeItem("token")
        context.commit("resetUser", null)
      }
    },
    async loadPaymentTypes(context) {
      try {
        let response = await axios.get("paymenttypes")
        context.commit("setPaymentTypes", response.data.data)
        return response.data.data
      } catch (error) {
        context.commit("resetPaymentTypes")
        throw error
      }
    },
    async restoreToken(context) {
      let storedToken = sessionStorage.getItem("token")
      if (storedToken) {
        axios.defaults.headers.common.Authorization = "Bearer " + storedToken
        return storedToken
      }
      delete axios.defaults.headers.common.Authorization
      context.commit("resetUser", null)
      return null
    },
    async loadLoggedInUser(context) {
      try {
        let response = await axios.get("users/me")
        context.commit("setUser", response.data.data)
        this.$socket.emit("logged_in", response.data.data)
      } catch (error) {
        delete axios.defaults.headers.common.Authorization
        context.commit("resetUser", null)
        throw error
      }
    },
    async loadTransactions(context) {
      try {
        let response = await axios.get(
          "vcards/" + context.state.user.username + "/transactions"
        )
        context.commit("setTransactions", response.data.data)
        return response.data.data
      } catch (error) {
        context.commit("resetTransactions", null)
        throw error
      }
    },
    async loadCategories(context) {
      try {
        let response = await axios.get(
          "vcards/" + context.state.user.username + "/categories"
        )
        context.commit("setCategories", response.data.data)
        return response.data.data
      } catch (error) {
        context.commit("resetCategories", null)
        throw error
      }
    },
    async loadVcard(context) {
      try {
        let response = await axios.get("vcards/" + context.state.user.username)
        context.commit("setVcard", response.data.data)
        return response.data.data
      } catch (error) {
        context.commit("resetVcard", null)
        throw error
      }
    },
    async SOCKET_userBlocked(context) {
      context.dispatch("logout")
      this.$toast.error("VCard Account Blocked")
      this.$router.push({ name: "Home" })
    },
    async refresh(context) {
      let userPromise = context.dispatch("loadLoggedInUser")
      let paymentTypesPromise = context.dispatch("loadPaymentTypes")

      await userPromise
      await paymentTypesPromise

      if (this.state.user && this.state.user.type == "V") {
        let vcardPromise = context.dispatch("loadVcard")
        let categoriesPromise = context.dispatch("loadCategories")
        let transactionsPromise = context.dispatch("loadTransactions")

        await categoriesPromise
        await vcardPromise
        await transactionsPromise
      }
    },
  },
})
