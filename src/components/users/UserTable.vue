<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-if="showId"
          class="align-middle"
        >#</th>
        <th class="align-middle">Name</th>
        <th
          v-if="showEmail"
          class="align-middle"
        >Email</th>
        <th
          v-if="showAdmin"
          class="align-middle"
        >Edit</th>
        <th
          class="align-middle"
        >Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
      >
        <td
          v-if="showId"
          class="align-middle"
        >{{ user.id }}</td>
        <td class="align-middle">{{ user.name }}</td>
        <td
          v-if="showEmail"
          class="align-middle"
        >{{ user.email }}</td>
        <td
          class="text-end align-middle"
          v-if="showEditButton"
        >
          <div class="d-flex">
            <button
              class="btn btn-xs btn-light"
              @click="editClick(user)"
              v-if="showEditButton"
            ><i class="bi bi-xs bi-pencil"></i>
            </button>
          </div>

        </td>
        <td class="text-end align-middle">
          <div class="d-flex" v-if="user.email != this.$store.state.user.username">
            <button
              class="btn btn-xs btn-light"
              v-if="showDeleteButton"
              @click="deleteClick(user)"
            ><i class="bi bi-xs bi-trash"></i>
            </button>
          </div>
          </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {

  name: "UserTable",
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    showId: {
      type: Boolean,
      default: true,
    },
    showEmail: {
      type: Boolean,
      default: true,
    },
    showAdmin: {
      type: Boolean,
      default: true,
    },
    showGender: {
      type: Boolean,
      default: false,
    },
    showPhoto: {
      type: Boolean,
      default: true,
    },
    showEditButton: {
      type: Boolean,
      default: true,
    },
     showDeleteButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'edit',
    'delete',
  ],
  methods: {
    editClick (user) {
      this.$emit('edit', user)
    },
     deleteClick (user) {
        this.$emit('delete', user)
    },
  }
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}

.img_photo {
  width: 3.2rem;
  height: 3.2rem;
}
</style>
