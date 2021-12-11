import { createStore } from "vuex"

import axios from "axios"

export default createStore({
  state: {
    user: null,
    transactions: [],
    paymentTypes: [],
    categories: [],
    contacts: [],
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
    setContacts(state, contacts) {
      state.contacts = contacts
    },
    resetContacts(state) {
      state.contacts = null
    },
    insertContact(state, newContact) {
      state.contacts.push(newContact)
    },
    updateContact(state, updateContact) {
      let idx = state.contacts.findIndex((t) => t.id === updateContact.id)
      if (idx >= 0) {
        state.contacts[idx] = updateContact
      }
    },
    deleteContact(state, deleteContact) {
      let idx = state.contacts.findIndex((t) => t.id === deleteContact.id)
      if (idx >= 0) {
        state.contacts.splice(idx, 1)
      }
    },
  },
  getters: {
    paymentTypes: (state) => {
      return state.paymentTypes
    },
    categories: (state) => {
      return state.categories
    },
    contacts: (state) => {
      return state.contacts
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
    async loadCategories(context) {
      try {
        let response = await axios.get(
          "vcards/" + context.state.user.username + "/categories"
        )
        context.commit("setCategories", response.data.data)
        return response.data.data
      } catch (error) {
        context.commit("resetCategories")
        throw error
      }
    },
    async loadContacts(context) {
      try {
        let response = await axios.get(
          "vcards/" + context.state.user.username + "/contacts"
        )
        context.commit("setContacts", response.data.data)
        return response.data.data
      } catch (error) {
        context.commit("resetContacts")
        throw error
      }
    },
    async insertContact(context, contact) {
      let response = await axios.post("contacts", contact)

      if (response.status == 201){
        context.commit('insertContact', response.data.data)
      }

      return response.data.data
    },
    async updateContact(context, contact) {
      let response = await axios.put("contacts/" + contact.id, contact)

      if (response.status == 200)
        context.commit('updateContact', response.data.data)

      return response.data.data
    },
    async deleteContact(context, contact) {
      let response = await axios.delete("contacts/" + contact.id)

      if (response.status == 200)
        context.commit('deleteContact', response.data.data)

      return response.data.data
    },
    async refresh(context) {
      let userPromise = context.dispatch("loadLoggedInUser")
      let paymentTypesPromise = context.dispatch("loadPaymentTypes")

      await userPromise
      await paymentTypesPromise

      if (this.state.user && this.state.user.type == 'V') {
        let categoriesPromise = context.dispatch("loadCategories")
        let contactsPromise = context.dispatch("loadContacts")

        await categoriesPromise
        await contactsPromise
      }
    },
  },
})
