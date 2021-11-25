import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import Toaster from "@meforma/vue-toaster"

let toastOptions = {
  position: "top",
  timeout: 3000,
  pauseOnHover: true,
}
const app = createApp(App).use(store).use(router).use(Toaster, toastOptions)

axios.defaults.baseURL = "http://projectdad.test/api"
app.config.globalProperties.$axios = axios
app.config.globalProperties.$serverUrl = "http://projectdad.test/"
// Remove the following line latter
// this.$userId with represent the logged in user
app.config.globalProperties.$userId = 1

app.mount("#app")
