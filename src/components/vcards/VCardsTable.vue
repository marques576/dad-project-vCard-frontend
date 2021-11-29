<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="showPhoneNumber">Phone Number</th>
        <th v-if="showName">Name</th>
        <th v-if="showEmail">Email</th>
        <th v-if="showBalance">Balance</th>
        <th v-if="showMaxDebit">Max Debit</th>
        <th v-if="showEditButton || showDeleteButton"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vcard in vcards" :key="vcard.phone_number">
        <td v-if="showPhoneNumber" class="text-primary">
          {{ vcard.phone_number }}
        </td>
        <td v-if="showName">{{ vcard.name }}</td>
        <td v-if="showEmail">{{ vcard.email }}</td>
        <td v-if="showBalance">{{ vcard.balance + "€" }}</td>
        <td v-if="showMaxDebit" class="text-danger">
          {{ vcard.max_debit }}
        </td>
        <td class="text-end" v-if="showEditButton || showDeleteButton">
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-xs btn-light"
              @click="editClick(vcard)"
              v-if="showEditButton"
            >
              <i class="bi bi-xs bi-pencil"></i>
            </button>

            <button
              class="btn btn-xs btn-light"
              @click="deleteClick(vcard)"
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
  name: "VCardsTable",
  props: {
    vcards: {
      type: Array,
      default: () => [],
    },
    showPhoneNumber: {
      type: Boolean,
      default: true,
    },
    showName: {
      type: Boolean,
      default: true,
    },
    showEmail: {
      type: Boolean,
      default: true,
    },
    showBalance: {
      type: Boolean,
      default: true,
    },
    showMaxDebit: {
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
    editClick(vcard) {
      this.$emit("edit", vcard)
    },
    deleteClick(vcard) {
      this.$emit("delete", vcard)
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
