<template>
  <div>
    <div>
      <div class="form-group d-flex" style="margin-bottom: 10px">
        <div>
          <label for="completeInput" style="margin-right: 10px">Category</label>
          <select
            id="categoryInput"
            @change="editCategory"
            v-model="editTransaction.category_id"
          >
            <option :value="null">None</option>
            <option
              v-for="category in filtered_categories"
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
        <div class="d-flex justify-content-end">
        <button type="button" @click="pdfDownload" class="btn btn-danger">
          Get PDF
        </button>
        </div>
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
  computed: {
    filtered_categories(){
      return this.$store.getters.categories.filter((c) => c.type == this.transaction.type)
    }
  },
  methods: {
    editDescription() {
      this.$emit("updateDescription")
    },
    editCategory() {
      this.$emit("updateCategory")
    },
    pdfDownload() {
      this.$axios
        .get("pdf/" + this.editTransaction.id, { responseType: "blob" })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement("a")
          link.href = url
          link.setAttribute("download", this.editTransaction.id + ".pdf") //or any other extension
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
</style>

