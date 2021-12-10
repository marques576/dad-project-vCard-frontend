<template>
  <div>
    <div>
      <div class="form-group d-flex" style="margin-bottom: 10px">
        <div>
          <label for="completeInput" style="margin-right: 10px">Category</label>
          <select id="categoryInput" @change="editCategory" v-model="editTransaction.category_id">
            <option :value="null">None</option>
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
      <div class="form-group">
        <label for="inputDescription" style="margin-bottom: 5px"
          >Description</label
        >
        <textarea
          v-model="editTransaction.description"
          rows="3"
          @focusout="editDescription"
          class="form-control"
          placeholder="Enter the transaction description"
          id="inputDescription"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionEdit",
  props: {
    transaction: Object,
    categories: Object,
  },
  emits: ["updateDescription", "updateCategory"],
  data() {
    return {
      editTransaction: this.transaction,
    }
  },
  methods: {
    editDescription() {
      this.$emit("updateDescription")
    },
    editCategory(){
      this.$emit("updateCategory")
    }
  },
}
</script>

<style scoped>
</style>

