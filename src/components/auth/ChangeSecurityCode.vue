<template>
  <form
    class="row g-3 needs-validation"
    novalidate
    @submit.prevent="changeCode"
  >
    <h3 class="mt-5 mb-3">Change Code</h3>
    <hr />
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputCurrentCode" class="form-label">Current Code</label>
        <input
          type="text"
          class="form-control"
          id="inputCurrentCode"
          required
          v-model="codes.oldcode"
          v-bind:class="{
            'is-invalid': v$.codes.oldcode.$error ?? false,
          }"
        />
        <span v-if="v$.codes.oldcode.$error" style="color: red">
          {{ v$.codes.oldcode.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="oldcode"
        ></field-error-message>
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputCode" class="form-label">New Code</label>
        <input
          type="text"
          class="form-control"
          id="inputCode"
          required
          v-model="codes.code"
          v-bind:class="{ 'is-invalid': v$.codes.code.$error ?? false }"
        />
        <span v-if="v$.codes.code.$error" style="color: red">
          {{ v$.codes.code.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="code"
        ></field-error-message>
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label for="inputCodeConfirm" class="form-label"
          >Code Confirmmation</label
        >
        <input
          type="text"
          class="form-control"
          id="inputCodeConfirm"
          required
          v-model="codes.code_confirmation"
          v-bind:class="{
            'is-invalid': v$.codes.code_confirmation.$error ?? false,
          }"
        />
        <span v-if="v$.codes.code_confirmation.$error" style="color: red">
          {{ v$.codes.code_confirmation.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="code_confirmation"
        ></field-error-message>
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <button type="button" class="btn btn-primary px-5" @click="changeCode">
        Change Code
      </button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core"
import { required, sameAs } from "@vuelidate/validators"

export default {
  name: "ChangeCode",
  data() {
    return {
      v$: useVuelidate(),
      codes: {
        oldcode: "",
        code: "",
        code_confirmation: "",
      },
      errors: [],
    }
  },
  validations() {
    return {
      codes: {
        oldcode: { required },
        code: { required },
        code_confirmation: { required, sameAs: sameAs("code") },
      },
    }
  },
  // emits: ["changedCode"],
  methods: {
    changeCode() {
      this.v$.$touch()
      this.$axios
        .patch("vcards/" + this.$store.state.user.id + "/code", this.codes)
        .then(() => {
          this.$toast.success("Security Code updated successfully.")
          this.$router.back()
        })
        .catch((error) => {
          this.errors = error.response.data.errors
          console.log(error)
          this.$toast.error("Security Code not updated.")
        })
    },
  },
}
</script>

<style scoped></style>
