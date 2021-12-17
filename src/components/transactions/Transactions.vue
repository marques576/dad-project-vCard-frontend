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
      <select @change="refresh" class="form-select" id="selectType" v-model="filterByType">
        <option :value="null">All</option>
        <option value="D">Deposits</option>
        <option value="C">Credits</option>
      </select>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectCategory" class="form-label">Filter by category:</label>
      <select @change="refresh" class="form-select" id="selectOwner" v-model="filterByCategory">
        <option :value="null">All</option>
        <option
          v-for="category in this.$store.getters.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
  </div>
  <div class="mb-3 d-flex justify-content-around">
    <div class="mt-2 mx-2 flex-grow-1">
      <label>From: </label>
      <Datepicker lang="pt" @cleared="refresh" v-model="dateFrom" :maxDate="new Date()" /> 
    </div>
    <div class="mt-2 mx-2 flex-grow-1">
      <label>To: </label>
      <Datepicker @cleared="refresh" v-model="dateTo" :maxDate="new Date()" /> 
    </div>
  </div>
  <transaction-table
    :transactions="transactions"
    :showId="true"
    :showDates="true"
    @updateDescription="updateTransactionDescription"
    @updateCategory="updateTransactionCategory"
    @changeOrder="changeOrder"
  ></transaction-table>
  <template class="paginator">
    <pagination
      v-model="page"
      :records="paginationData ? paginationData.total : 0"
      :per-page="paginationData ? paginationData.per_page : 0"
      @paginate="loadTransactions"
      :options="{ hideCount: true, theme: 'bootstrap3' }"
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
      dateFrom: null,
      dateTo: null,
      order: 'desc',
      orderBy: 'date',
      page: 1,
      paginationData: null,
    }
  },
  watch: {
    dateTo(){
      this.refresh();
    },
    dateFrom(){
      this.refresh();
    }
  },
  computed: {
    totalTransactions() {
      return this.paginationData ? this.paginationData.total : 0;
    },
  },
  sockets: {
    newTransaction() {
      this.loadTransactions()
    },
  },
  methods: {
    changeOrder(order, orderBy){
      this.order = order
      this.orderBy = orderBy
      this.refresh()
    },
    refresh(){
      this.loadTransactions()
      this.page = 1
    },
    loadTransactions() {
      let query = "vcards/" + this.$store.state.user.id + "/transactions?page=" + this.page + "&order=" + this.order + "&orderBy=" + this.orderBy
      if (this.filterByCategory){
        query += "&category=" + this.filterByCategory
      }
      if (this.filterByType){
        query += "&type=" + this.filterByType 
      }
      if (this.dateFrom){
        query += "&from=" + this.dateFrom.toISOString().split('T')[0] + ' ' + this.dateFrom.toTimeString().split(' ')[0];
      }
      if (this.dateTo){
        query += "&to=" + this.dateTo.toISOString().split('T')[0] + ' ' + this.dateTo.toTimeString().split(' ')[0];
      }
      this.$axios
        .get(query)
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
    updateTransactionCategory(id, category_id) {
      this.$axios
        .patch("transactions/" + id, { category_id: category_id })
        .then(() => {
          this.$toast.success("Edited transaction category with success!")
        })
        .catch((error) => {
          this.$toast.error(
            "Error editing transaction category! " +
              error.response.data.errors["category_id"][0]
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
