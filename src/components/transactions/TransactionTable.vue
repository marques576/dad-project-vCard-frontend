<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="showId">#</th>
        <th v-if="showDateTime" style="cursor: pointer;" @click="changeOrderDate">Date <i v-show="orderBy == 'date'" class="bi" :class="{'bi-caret-down-fill': order == 'desc', 'bi-caret-up-fill': order == 'asc'}"></i></th>
        <th v-if="showType">Type</th>
        <th v-if="showOldBalance">Old Balance</th>
        <th v-if="showNewBalance">New Balance</th>
        <th v-if="showPaymentType">Payment Type</th>
        <th v-if="showPaymentReference">Payment Reference</th>
        <th v-if="showValue" style="cursor: pointer;" @click="changeOrderValue">Value <i v-show="orderBy == 'value'" class="bi" :class="{'bi-caret-down-fill': order == 'desc', 'bi-caret-up-fill': order == 'asc'}"></i></th>
        <th v-if="showEditButton || showDeleteButton"></th>
      </tr>
    </thead>
    <tbody>
      <template v-for="transaction in transactions" :key="transaction.id">
        <tr>
          <td v-if="showId" class="text-primary">{{ transaction.id }}</td>
          <td v-if="showDateTime">{{ transaction.datetime }}</td>
          <td v-if="showType">{{ transaction.type }}</td>
          <td v-if="showOldBalance">{{ transaction.old_balance + "€" }}</td>
          <td v-if="showNewBalance">{{ transaction.new_balance + "€" }}</td>
          <td v-if="showPaymentType" class="text-info">
            {{ transaction.payment_type }}
          </td>
          <td v-if="showPaymentReference">
            {{ transaction.payment_reference }}
          </td>
          <td
            v-if="showValue"
            :class="{
              'text-success': transaction.type == 'C',
              'text-danger': transaction.type == 'D',
            }"
          >
            {{
              (transaction.type == "C" ? "+" : "-") + transaction.value + "€"
            }}
          </td>
          <td class="text-end" v-if="showEditButton || showDeleteButton">
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-xs btn-light"
                @click="
                  transaction.editing = transaction.editing ? false : true
                "
                v-if="showEditButton"
              >
                <i
                  class="bi m-0"
                  :class="{
                    'bi-caret-down-fill': !transaction.editing,
                    'bi-caret-up-fill': transaction.editing,
                  }"
                ></i>
              </button>

              <button
                class="btn btn-xs btn-light"
                @click="deleteClick(project)"
                v-if="showDeleteButton"
              >
                <i class="bi bi-xs bi-x-square-fill"></i>
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="transaction.editing">
          <td colspan="9">
            <transaction-edit
              @updateDescription="updateDescription(transaction.id, transaction.description)"
              @updateCategory="updateCategory(transaction.id, transaction.category_id)"
              :transaction="transaction"
            />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import TransactionEdit from "./TransactionEdit.vue"

export default {
  name: "TransactionsTable",
  components: {
    TransactionEdit,
  },
  data() {
    return {
      orderBy: 'date',
      order: 'desc'
    }
  },
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
    showId: {
      type: Boolean,
      default: true,
    },
    showDateTime: {
      type: Boolean,
      default: true,
    },
    showType: {
      type: Boolean,
      default: true,
    },
    showValue: {
      type: Boolean,
      default: true,
    },
    showOldBalance: {
      type: Boolean,
      default: true,
    },
    showNewBalance: {
      type: Boolean,
      default: true,
    },
    showPaymentType: {
      type: Boolean,
      default: true,
    },
    showPaymentReference: {
      type: Boolean,
      default: true,
    },
    showCategory: {
      type: Boolean,
      default: true,
    },
    showDescription: {
      type: Boolean,
      default: true,
    },
    showEditButton: {
      type: Boolean,
      default: true,
    },
    showDeleteButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["updateDescription", "updateCategory", "delete", "changeOrder"],
  methods: {
    changeOrderValue(){
      if (this.orderBy == 'value'){
        this.order = this.order == 'desc' ? 'asc' : 'desc'
      } else {
        this.orderBy = 'value'
        this.order = 'desc'
      }
      this.changeOrder(this.order, this.orderBy)
    },
    changeOrderDate(){
      if (this.orderBy == 'date'){
        this.order = this.order == 'desc' ? 'asc' : 'desc'
      } else {
        this.orderBy = 'date'
        this.order = 'desc'
      }
      this.changeOrder(this.order, this.orderBy)
    },
    editClick(project) {
      this.$emit("edit", project)
    },
    deleteClick(project) {
      this.$emit("delete", project)
    },
    updateDescription(id, description) {
      this.$emit("updateDescription", id, description)
    },
    updateCategory(id, category_id) {
      this.$emit("updateCategory", id, category_id)
    },
    changeOrder(order, orderBy){
      this.$emit("changeOrder", order, orderBy)
    }
  },
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
