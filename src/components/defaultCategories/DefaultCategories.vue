<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Default Categories</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalDefaultCategories }}</h5>
    </div>
  </div>
  <hr />
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectType" class="form-label">Filter by status:</label>
      <select class="form-select" id="selectType" v-model="filterByType">
        <option :value="null"></option>
        <option value="C">Credito</option>
        <option value="D">Debito</option>
      </select>
    </div>
    <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-success px-4 btn-addprj"
        @click="addDefaultCategory"
      >
        <i class="bi bi-xs bi-plus-circle"></i>&nbsp; Add Default Category
      </button>
    </div>
  </div>
  <default-category-table
    :defaultCategories="filteredDefaultCategories"
    :showId="true"
    @edit="editDefaultCategory"
    @delete="deleteDefaultCategory"
  ></default-category-table>
</template>

<script>
import DefaultCategoryTable from "./DefaultCategoryTable.vue"

export default {
  name: "DefaultCategories",
  components: {
    DefaultCategoryTable,
  },
  data() {
    return {
      defaultCategories: [],
      users: [],
      filterByVCard: null,
      filterByType: "",
    }
  },
  computed: {
    filteredDefaultCategories() {
      return this.defaultCategories.filter(
        (c) => !this.filterByType || this.filterByType == c.type
      )
    },
    totalDefaultCategories() {
      return this.defaultCategories.reduce(
        (counter, c) =>
          !this.filterByType || this.filterByType == c.type
            ? counter + 1
            : counter,
        0
      )
    },
  },
  methods: {
    loadDefaultCategories() {
      this.$axios
        .get("defaultCategories")
        .then((response) => {
          this.defaultCategories = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadUsers() {
      this.$axios
        .get("users")
        .then((response) => {
          this.users = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addDefaultCategory() {
      this.$router.push({ name: "NewDefaultCategory" })
    },
    editDefaultCategory(defaultCategory) {
      this.$router.push({
        name: "DefaultCategory",
        params: { id: defaultCategory.id },
      })
    },
    deleteDefaultCategory(defaultCategory) {
      this.$axios
        .delete("defaultCategories/" + defaultCategory.id)
        .then((response) => {
          let deletedDefaultCategory = response.data.data
          let idx = this.defaultCategories.findIndex(
            (t) => t.id === deletedDefaultCategory.id
          )
          if (idx >= 0) {
            this.defaultCategories.splice(idx, 1)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.loadUsers()
    this.loadDefaultCategories()
  },
}
</script>

<style scoped>
.filter-div {
  min-width: 12rem;
}
.total-filtro {
  margin-top: 0.35rem;
}
.btn-addprj {
  margin-top: 1.85rem;
}
</style>
