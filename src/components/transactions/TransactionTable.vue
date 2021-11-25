<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="showId">#</th>
        <th v-if="showDateTime">Date</th>
        <th v-if="showType">Type</th>
        <th v-if="showOldBalance">Old Balance</th>
        <th v-if="showNewBalance">New Balance</th>
        <th v-if="showPaymentType">Payment Type</th>
        <th v-if="showPaymentReference">Payment Reference</th>
        <th v-if="showCategory">Category</th>
        <th v-if="showDescription">Description</th>
        <th v-if="showValue">Value</th>
        <th v-if="showEditButton || showDeleteButton"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction in transactions"
        :key="transaction.id"
      >
        <td v-if="showId" class="text-primary">{{ transaction.id }}</td>
        <td v-if="showDateTime">{{ transaction.datetime }}</td>
        <td v-if="showType">{{ transaction.type }}</td>
        <td v-if="showOldBalance">{{ transaction.old_balance + "€" }}</td>
        <td v-if="showNewBalance">{{ transaction.new_balance + "€" }}</td>
        <td v-if="showPaymentType" class="text-info">{{ transaction.payment_type }}</td>
        <td v-if="showPaymentReference">{{ transaction.payment_reference }}</td>
        <td v-if="showCategory">{{ transaction.category_id }}</td>
        <td v-if="showDescription">{{ transaction.description }}</td>
        <td v-if="showValue" :class="{'text-success': transaction.type == 'C', 'text-danger': transaction.type == 'D'}">{{ (transaction.type == 'C' ? '+' : '-') + transaction.value + "€"}}</td>
        <td
          class="text-end"
          v-if="showEditButton || showDeleteButton"
        >
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-xs btn-light"
              @click="editClick(project)"
              v-if="showEditButton"
            ><i class="bi bi-xs bi-pencil"></i>
            </button>

            <button
              class="btn btn-xs btn-light"
              @click="deleteClick(project)"
              v-if="showDeleteButton"
            ><i class="bi bi-xs bi-x-square-fill"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {

  name: "TransactionsTable",
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
  emits: [
    'edit',
    'delete',
  ],
  methods: {
    editClick (project) {
      this.$emit('edit', project)
    },
    deleteClick (project) {
      this.$emit('delete', project)
    },
  }
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
