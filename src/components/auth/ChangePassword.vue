<template>
  <form
    class="row g-3 needs-validation"
    novalidate
    @submit.prevent="changePassword"
  >
    <h3 class="mt-5 mb-3">Change Password</h3>
    <hr />
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputCurrentPassword" class="form-label"
          >Current Password</label
        >
        <input
          type="password"
          class="form-control"
          id="inputCurrentPassword"
          required
          v-model="passwords.oldpassword"
        />
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputPassword" class="form-label">New Password</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          required
          v-model="passwords.password"
        />
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputPasswordConfirm" class="form-label"
          >Password Confirmmation</label
        >
        <input
          type="password"
          class="form-control"
          id="inputPasswordConfirm"
          required
          v-model="passwords.password_confirmation"
        />
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-primary px-5"
        @click="changePassword"
      >
        Change Password
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      passwords: {
        oldpassword: "",
        password: "",
        password_confirmation: "",
      },
    }
  },
  // emits: ["changedPassword"],
  methods: {
    changePassword() {
      this.$axios
        .patch(
          (this.$store.state.user.type == "A"
            ? "administrators/"
            : "vcards/") +
            this.$store.state.user.id +
            "/password",
          this.passwords
        )
        .then(() => {
          this.$toast.success("Password updated successfully.")
          this.$router.back()
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error("Password not updated.")
        })
    },
  },
}
</script>

<style scoped></style>
