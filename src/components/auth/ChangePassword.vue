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
          v-bind:class="{
            'is-invalid': v$.passwords.oldpassword.$error ?? false,
          }"
        />
        <span v-if="v$.passwords.oldpassword.$error" style="color: red">
          {{ v$.passwords.oldpassword.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="oldpassword"
        ></field-error-message>
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
          v-bind:class="{ 'is-invalid': v$.passwords.password.$error ?? false }"
        />
        <span v-if="v$.passwords.password.$error" style="color: red">
          {{ v$.passwords.password.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="password"
        ></field-error-message>
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
          v-bind:class="{
            'is-invalid': v$.passwords.password_confirmation.$error ?? false,
          }"
        />
        <span
          v-if="v$.passwords.password_confirmation.$error"
          style="color: red"
        >
          {{ v$.passwords.password_confirmation.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="password_confirmation"
        ></field-error-message>
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
import useVuelidate from "@vuelidate/core"
import { required, sameAs } from "@vuelidate/validators"

export default {
  name: "ChangePassword",
  data() {
    return {
      v$: useVuelidate(),
      passwords: {
        oldpassword: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
    }
  },
  validations() {
    return {
      passwords: {
        oldpassword: { required },
        password: { required },
        password_confirmation: { required, sameAs: sameAs("password") },
      },
    }
  },
  // emits: ["changedPassword"],
  methods: {
    changePassword() {
      this.v$.$touch()
      this.$axios
        .patch(
          (this.$store.state.user.type == "A" ? "administrators/" : "vcards/") +
            this.$store.state.user.id +
            "/password",
          this.passwords
        )
        .then(() => {
          this.$toast.success("Password updated successfully.")
          this.$router.back()
        })
        .catch((error) => {
          this.errors = error.response.data.errors
          console.log(error)
          this.$toast.error("Password not updated.")
        })
    },
  },
}
</script>

<style scoped></style>
