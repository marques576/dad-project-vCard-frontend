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
          />
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
          />
        </div>
        <div class="mb-3">
          <div class="mb-3">
            <label for="inputPassword" class="form-label">New Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="Password"
              required
              v-model="newUser.password"
            />
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

export default {
  name: "NewUser",
  components: {},
  data() {
    return {
      newUser: this.emptyUser(),
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
            this.$axios.post('administrators', this.newUser)
        .then((response) => {
          this.$toast.success('Administrator #' + response.data.data.id + ' was updated successfully.')
          this.$router.back()
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.$toast.error('Administrator #' + this.id + ' was not updated due to validation errors!')
          } else {
            this.$toast.error('Administrator #' + this.id + ' was not updated due to unknown server error!')
          }
        })
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
