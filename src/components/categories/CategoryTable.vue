<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="showId">#</th>
        <th>VCard</th>
        <th>Type</th>
        <th>Name</th>
        <th v-if="showEditButton || showDeleteButton"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categories" :key="category.id">
        <td v-if="showId">{{ category.id }}</td>
        <td>{{ category.vcard }}</td>
        <td>{{ category.type }}</td>
        <td>{{ category.name }}</td>
        <td class="text-end" v-if="showEditButton || showDeleteButton">
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-xs btn-light"
              @click="editClick(category)"
              v-if="showEditButton"
            >
              <i class="bi bi-xs bi-pencil"></i>
            </button>

            <button
              class="btn btn-xs btn-light"
              @click="deleteClick(category)"
              v-if="showDeleteButton"
            >
              <i class="bi bi-xs bi-x-square-fill"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "CategoryTable",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    showId: {
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
  emits: ["edit", "delete"],
  methods: {
    editClick(category) {
      this.$emit("edit", category)
    },
    deleteClick(category) {
      this.$emit("delete", category)
    },
  },
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
