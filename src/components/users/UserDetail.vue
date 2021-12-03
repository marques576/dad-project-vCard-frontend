<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="save">
    <h3 class="mt-5 mb-3">User {{ this.editingUser.id }}</h3>
    <hr />
    <div class="d-flex flex-wrap justify-content-between">
      <div class="w-75 pe-4">
        <div class="mb-3">
          <label for="inputName" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder="User Name"
            required
            v-model="editingUser.name"
            v-bind:class="{ 'is-invalid': v$.editingUser.name.$error ?? false }"
          />
          <span v-if="v$.editingUser.name.$error" style="color: red">
            {{ v$.editingUser.name.$errors[0].$message }}
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
            v-model="editingUser.email"
            v-bind:class="{
              'is-invalid': v$.editingUser.email.$error ?? false,
            }"
          />
          <span v-if="v$.editingUser.email.$error" style="color: red">
            {{ v$.editingUser.email.$errors[0].$message }}
          </span>
      <field-error-message
        :errors="errors"
        fieldName="email"
      ></field-error-message>
        </div>
        <div class="d-flex ms-1 mt-4 flex-wrap justify-content-between">
          <div class="mb-3 me-3 flex-grow-1">
            <label class="form-check-label" for="inputType">
              User is Administrator
            </label>
          </div>
        </div>
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
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core"
import { required,email } from "@vuelidate/validators"
export default {
  name: "UserDetail",
  components: {},
  props: {
    user: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
    },
  },
  emits: ["save", "cancel"],
  data() {
    return {
      v$: useVuelidate(),
      editingUser: this.user,
      isSubmitted: false,
    }
  },
  validations() {
    return {
      editingUser: {
        name: { required },
        email: { required,email },
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
    save() {
      this.v$.$touch()
      if (!this.v$.$error) {
        this.$emit("save", this.editingUser)
      }
    },
    cancel() {
      this.$emit("cancel", this.editingUser)
    },
  },
}
</script>

<style scoped>
.total_hours {
  width: 26rem;
}
</style>
