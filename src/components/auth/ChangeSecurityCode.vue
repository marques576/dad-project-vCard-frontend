<template>
  <form
    class="row g-3 needs-validation"
    novalidate
    @submit.prevent="changeCode"
  >
    <h3 class="mt-5 mb-3">Change Security Code</h3>
    <hr />
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputCurrentSecurityCode" class="form-label"
          >Current Code</label
        >
        <input
          type="password"
          class="form-control"
          id="inputCurrentSecurityCode"
          required
          v-model="codes.oldcode"
        />
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputSecurityCode" class="form-label">New Code</label>
        <input
          type="password"
          class="form-control"
          id="inputSecurityCode"
          required
          v-model="codes.code"
        />
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputSecurityCodeConfirm" class="form-label"
          >Code Confirmmation</label
        >
        <input
          type="password"
          class="form-control"
          id="inputSecurityCodeConfirm"
          required
          v-model="codes.code_confirmation"
        />
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <button type="button" class="btn btn-primary px-5" @click="changeCode">
        Change Security Code
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ChangeCode",
  data() {
    return {
      codes: {
        oldcode: "",
        code: "",
        code_confirmation: "",
      },
    }
  },
  // emits: ["changedCode"],
  methods: {
    changeCode() {
      this.$axios
        .patch("vcards/" + this.$store.state.user.id + "/code", this.codes)
        .then(() => {
          this.$toast.success("Security Code updated successfully.")
          this.$router.back()
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error("Security Code not updated.")
        })
    },
  },
}
</script>

<style scoped></style>
