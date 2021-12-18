import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import Toaster from "@meforma/vue-toaster"
import Pagination from "v-pagination-3"
import VueSocketIO from "vue-3-socket.io"
import Datepicker from "vue3-date-time-picker"
import "vue3-date-time-picker/dist/main.css"

import FieldErrorMessage from "./components/global/FieldErrorMessage.vue"
import ConfirmationDialog from "./components/global/ConfirmationDialog.vue"

const apiDomain = process.env.VUE_APP_API_DOMAIN
const wsConnection = process.env.VUE_APP_WS_CONNECTION

let toastOptions = {
  position: "top",
  timeout: 3000,
  pauseOnHover: true,
}

const socketIO = new VueSocketIO({
  debug: true,
  connection: wsConnection,
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_",
  },
})

const app = createApp(App)
  .use(store)
  .use(router)
  .use(Toaster, toastOptions)
  .use(socketIO)

store.$socket = socketIO.io
store.$toast = app.$toast
store.$router = router

axios.defaults.baseURL = `${apiDomain}/api`
app.config.globalProperties.$axios = axios
app.config.globalProperties.$serverUrl = apiDomain

app.component("field-error-message", FieldErrorMessage)
app.component("confirmation-dialog", ConfirmationDialog)
app.component("pagination", Pagination)
app.component("Datepicker", Datepicker)

app.mount("#app")