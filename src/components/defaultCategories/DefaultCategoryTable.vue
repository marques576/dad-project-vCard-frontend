<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="showId">#</th>
        <th>Type</th>
        <th>Name</th>
        <th v-if="showEditButton || showDeleteButton"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="defaultCategory in defaultCategories"
        :key="defaultCategory.id"
      >
        <td v-if="showId">{{ defaultCategory.id }}</td>
        <td>{{ defaultCategory.type }}</td>
        <td>{{ defaultCategory.name }}</td>
        <td class="text-end" v-if="showEditButton || showDeleteButton">
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-xs btn-light"
              @click="editClick(defaultCategory)"
              v-if="showEditButton"
            >
              <i class="bi bi-xs bi-pencil"></i>
            </button>

            <button
              class="btn btn-xs btn-light"
              @click="deleteClick(defaultCategory)"
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
  name: "DefaultCategoryTable",
  props: {
    defaultCategories: {
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
    editClick(defaultCategory) {
      this.$emit("edit", defaultCategory)
    },
    deleteClick(defaultCategory) {
      this.$emit("delete", defaultCategory)
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
