<template>
  <h3 class="mt-5 mb-3">Administrators</h3>
  <hr>
      <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-success px-4 btn-addprj"
        @click="newUser"
      >
        <i class="bi bi-xs bi-plus-circle"></i>&nbsp; New Administrator
      </button>
    </div>
  <user-table
    :users="users"
    :showId="false"
    @edit="editUser"
    @delete="deleteUser"
  ></user-table>
</template>

<script>
import UserTable from "./UserTable.vue"

export default {
  name: 'Users',
  components: {
    UserTable
  },
  data () {
    return {
      users: []
    }
  },
  computed: {
    totalUsers () {
      return this.users.length
    }
  },
  methods: {
    loadUsers () {
      this.$axios.get('administrators')
        .then((response) => {
          this.users = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editUser (user) {
      this.$router.push({ name: 'User', params: { id: user.id } })
    },
    deleteUser (user) {
      this.$axios.delete('administrators/' + user.id)
        .then((response) => {
          console.log(response)
          this.loadUsers()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    newUser(){
      this.$router.push({ name: 'NewUser'})
    }
  },
  mounted () {
    this.loadUsers()
  }
}
</script>

<style scoped>
.filter-div {
  min-width: 12rem;
}
.total-filtro {
  margin-top: 2.3rem;
}
</style>
