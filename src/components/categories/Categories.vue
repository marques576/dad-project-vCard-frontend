<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Categories</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalCategories }}</h5>
    </div>
  </div>
  <hr />
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectType" class="form-label">Filter by type:</label>
      <select
        @change="loadCategories()"
        class="form-select"
        id="selectType"
        v-model="filterByType"
      >
        <option :value="null"></option>
        <option value="D">Debito</option>
        <option value="C">Credito</option>
      </select>
    </div>
    <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-success px-4 btn-addprj"
        @click="addCategory"
      >
        <i class="bi bi-xs bi-plus-circle"></i>&nbsp; Create new Category
      </button>
    </div>
  </div>
  <category-table
    :categories="filteredCategories"
    :showId="true"
    @edit="editCategory"
    @delete="deleteCategory"
  ></category-table>
  <template class="paginator">
    <pagination
      v-model="page"
      :records="paginationData ? paginationData.total : 0"
      :per-page="paginationData ? paginationData.per_page : 0"
      @paginate="loadCategories"
      :options="{ hideCount: true, theme: 'bootstrap3' }"
    ></pagination>
  </template>
</template>

<script>
import CategoryTable from "./CategoryTable.vue"

export default {
  name: "Categories",
  components: {
    CategoryTable,
  },
  data() {
    return {
      categories: [],
      filterByType: null,
      page: 1,
      paginationData: null,
    }
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(
        (c) => !this.filterByType || this.filterByType == c.type
      )
    },
    totalCategories() {
      return this.paginationData ? this.paginationData.total : 0
    },
  },
  methods: {
    loadCategories() {
      let query =
        "vcards/" + this.$store.state.user.id + "/categories?page=" + this.page
      if (this.filterByType) {
        query += "&type=" + this.filterByType
      }
      this.$axios
        .get(query)
        .then((response) => {
          this.categories = response.data.data
          this.paginationData = response.data.meta
        })
        .catch(() => {
          this.$toast.error("Error loading the categories!")
        })
    },
    addCategory() {
      this.$router.push({ name: "NewCategory" })
    },
    editCategory(category) {
      this.$router.push({ name: "Category", params: { id: category.id } })
    },
    deleteCategory(category) {
      this.$axios
        .delete("categories/" + category.id)
        .then((response) => {
          let deletedCategory = response.data.data
          let idx = this.categories.findIndex(
            (t) => t.id === deletedCategory.id
          )
          if (idx >= 0) {
            this.categories.splice(idx, 1)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.loadCategories()
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
.paginator {
  display: flex;
  justify-content: center;
}
</style>
