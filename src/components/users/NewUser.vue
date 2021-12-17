<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="save">
    <h3 class="mt-5 mb-3">Create a new administrator account</h3>
    <hr />
    <div style="width: 50%; margin: auto">
      <div class="d-flex flex-wrap justify-content-between">
        <div class="w-75 pe-4">
          <div class="mb-3">
            <label for="inputName" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="inputName"
              placeholder="Name"
              required
              v-model="newUser.name"
              v-bind:class="{ 'is-invalid': v$.newUser.name.$error ?? false }"
            />
          <span v-if="v$.newUser.name.$error" style="color: red">
            {{ v$.newUser.name.$errors[0].$message }}
          </span>
            <field-error-message
              :errors="errors"
              fieldName="name"
            ></field-error-message>
          </div>

          <div class="mb-3 px-1">
            <label for="inputEmail" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              placeholder="Email"
              required
              v-model="newUser.email"
              v-bind:class="{ 'is-invalid': v$.newUser.email.$error ?? false }"
            />
          <span v-if="v$.newUser.email.$error" style="color: red">
            {{ v$.newUser.email.$errors[0].$message }}
          </span>
            <field-error-message
              :errors="errors"
              fieldName="email"
            ></field-error-message>
          </div>
          <div class="mb-3">
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="Password"
                required
                v-model="newUser.password"
                v-bind:class="{ 'is-invalid': v$.newUser.password.$error ?? false }"
              />
          <span v-if="v$.newUser.password.$error" style="color: red">
            {{ v$.newUser.password.$errors[0].$message }}
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
                >Password Confimation</label
              >
              <input
                type="password"
                class="form-control"
                id="inputPasswordConfirm"
                placeholder="Password"
                required
                v-model="newUser.password_confirmation"
                v-bind:class="{ 'is-invalid': v$.newUser.password_confirmation.$error ?? false }"
              />
          <span v-if="v$.newUser.password_confirmation.$error" style="color: red">
            {{ v$.newUser.password_confirmation.$errors[0].$message }}
          </span>
              <field-error-message
                :errors="errors"
                fieldName="password_confirmation"
              ></field-error-message>
            </div>
          </div>

          <div class="mb-3 d-flex justify-content-end">
            <button type="button" class="btn btn-primary px-5" @click="save">
              Save
            </button>
            <button type="button" class="btn btn-light px-5" @click="cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core"
import { required,email,sameAs } from "@vuelidate/validators"

export default {
  name: "NewUser",
  components: {},
  data() {
    return {
      newUser: this.emptyUser(),
      errors: null,
      v$: useVuelidate(),
    }
  },
    validations() {
    return {
      newUser: {
        email: {required,email},
        name: { required },
        password: { required },
        password_confirmation: { required, sameAs: sameAs(this.newUser.password) },
      },
    }
  },

  watch: {
    user(newUser) {
      this.editingUser = newUser
    },
  },
  computed: {},
  methods: {
    emptyUser() {
      return {
        id: null,
        name: "",
        email: "",
        password: "",
      }
    },
    save() {
            this.v$.$touch()
      if (!this.v$.$error) {
      this.$axios
        .post("administrators", this.newUser)
        .then((response) => {
          this.$toast.success(
            "Administrator #" +
              response.data.data.id +
              " was updated successfully."
          )
          this.$router.back()
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
            console.log(this.errors)
            this.$toast.error(
              "Administrator #" +
                this.id +
                " was not updated due to validation errors!"
            )
          } else {
            this.$toast.error(
              "Administrator #" +
                this.id +
                " was not updated due to unknown server error!"
            )
          }
        })
      }
    },
    cancel() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.total_hours {
  width: 26rem;
}
</style>
