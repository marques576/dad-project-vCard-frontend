<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      style="width: 280px; height: 200px;"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue"

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
