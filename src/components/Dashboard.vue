<template>
<div v-if="this.$store.state.user.type == 'A'">
<AdminDashboard/>
</div>
<div v-if="this.$store.state.user.type == 'V'">
<VCardDashboard/>
</div>
</template>
<script>
import { defineComponent } from "vue"
import AdminDashboard from "./dashboards/AdminDashboard.vue";
import VCardDashboard from "./dashboards/VCardDashboard.vue";
export default defineComponent({
  name: "Dashboard",
  components: {
    AdminDashboard,
    VCardDashboard,
  },
})
</script>

<style>
</style>
