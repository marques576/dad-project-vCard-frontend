<template>
  <div
    style="
      background-color: #f5f5f5;
      overflow: hidden;
      height: 100vh;
      width: 100vw;
      position: absolute;
      top: 0;
      left: 0;
      color: white;
    "
  >
    <img style="width: 100%; height: auto" src="../assets/img/homeScreen.png" />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  beforeMount() {
    if (this.$store.state.user){
      this.$router.push({name: 'Dashboard'})
    }
  },
}
</script>