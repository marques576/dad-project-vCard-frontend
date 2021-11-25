<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Transactions</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalTransactions }}</h5>
    </div>
  </div>
  <hr />
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectStatus" class="form-label">Filter by type:</label>
      <select class="form-select" id="selectType" v-model="filterByType">
        <option :value="null"></option>
        <option value="D">Deposits</option>
        <option value="C">Credits</option>
      </select>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectCategory" class="form-label">Filter by category:</label>
      <select class="form-select" id="selectOwner" v-model="filterByCategory">
        <option :value="null"></option>
      </select>
    </div>
    <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-success px-4 btn-addprj"
        @click="addProject"
      >
        <i class="bi bi-xs bi-plus-circle"></i>&nbsp; New Transaction
      </button>
    </div>
  </div>
  <transaction-table
    :transactions="filteredTransactions"
    :showId="true"
    :showDates="true"
    @edit="editProject"
    @delete="deleteProject"
  ></transaction-table>
</template>

<script>
import TransactionTable from "./TransactionTable.vue"

export default {
  name: "Transactions",
  components: {
    TransactionTable,
  },
  data() {
    return {
      filterByType: null,
      filterByCategory: null,
    }
  },
  computed: {
    filteredTransactions() {
      return this.$store.getters.transactionsFilter(this.filterByType, this.filterByCategory);
    },
    totalTransactions() {
      return this.$store.getters.totalTransactionsFilter(this.filterByType, this.filterByCategory);
    },
  },
  methods: {
    addProject() {
      this.$router.push({ name: "NewProject" })
    },
    editProject(project) {
      this.$router.push({ name: "Project", params: { id: project.id } })
    },
    deleteProject(project) {
      this.$axios
        .delete("projects/" + project.id)
        .then((response) => {
          let deletedProject = response.data.data
          let idx = this.projects.findIndex((t) => t.id === deletedProject.id)
          if (idx >= 0) {
            this.projects.splice(idx, 1)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
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
