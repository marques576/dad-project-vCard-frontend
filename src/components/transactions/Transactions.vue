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
  </div>
  <transaction-table
    :transactions="filteredTransactions"
    :showId="true"
    :showDates="true"
    @updateDescription="updateTransactionDescription"
  ></transaction-table>
  <template class="paginator">
  <pagination
    v-model="page"
    :records="paginationData ? paginationData.total : 0"
    :per-page="paginationData ? paginationData.per_page : 0"
    @paginate="loadTransactions"
    :options="{hideCount: true, theme: 'bootstrap3'}"
  ></pagination>
  </template>
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
      transactions: [],
      filterByType: null,
      filterByCategory: null,
      page: 1,
      paginationData: null
    }
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(
        (p) =>
          (!this.filterByType || this.filterByType == p.type) &&
          (!this.filterByCategory || this.filterByCategory == p.category_id)
      )
    },
    totalTransactions() {
      return this.filteredTransactions.length
    },
  },
  methods: {
    loadTransactions() {
      this.$axios
        .get(
          "vcards/" + this.$store.state.user.id + "/transactions?page=" + this.page
        )
        .then((response) => {
          this.transactions = response.data.data
          this.paginationData = response.data.meta
        })
        .catch(() => {
          this.$toast.error("Error loading the transactions!")
        })
    },
    updateTransactionDescription(id, description) {
      this.$axios
        .patch("transactions/" + id, { description: description })
        .then(() => {
          this.$toast.success("Edited transaction description with success!")
        })
        .catch((error) => {
          this.$toast.error(
            "Error editing transaction description! " +
              error.response.data.errors["description"][0]
          )
        })
    },
  },
  mounted() {
    this.loadTransactions()
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
