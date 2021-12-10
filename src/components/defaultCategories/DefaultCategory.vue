<template>
  <default-category-detail
    :operationType="operation"
    :defaultCategory="defaultCategory"
    :errors="errors"
    @save="save"
    @cancel="cancel"
  ></default-category-detail>
</template>

<script>
import DefaultCategoryDetail from "./DefaultCategoryDetail.vue"

export default {
  name: "Category",
  components: {
    DefaultCategoryDetail,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      defaultCategory: this.newDefaultCategory(),
      errors: null,
    }
  },
  computed: {
    operation() {
      return !this.id || this.id < 0 ? "insert" : "update"
    },
  },
  watch: {
    id: {
      immediate: true,
      handler(newValue) {
        this.loadDefaultCategory(newValue)
      },
    },
  },
  methods: {
    newDefaultCategory() {
      return {
        id: null,
        type: "C",
        name: "",
      }
    },
    loadDefaultCategory(id) {
      if (!id || id < 0) {
        this.defaultCategory = this.newDefaultCategory()
      } else {
        this.$axios
          .get("defaultCategories/" + id)
          .then((response) => {
            this.defaultCategory = response.data.data
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    save() {
      if (this.operation == "insert") {
        this.$axios
          .post("defaultCategories", this.defaultCategory)
          .then((response) => {
            this.$toast.success(
              "DefaultCategory #" +
                response.data.data.id +
                " was created successfully."
            )
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.errors = error.response.data.errors
              this.$toast.error(
                "Default Category was not created due to validation errors!"
              )
            } else {
              this.$toast.error(
                "Default Category was not created due to unknown server error!"
              )
            }
          })
      } else {
        this.$axios
          .put("defaultCategories/" + this.id, this.defaultCategory)
          .then((response) => {
            this.$toast.success(
              "Default Category #" +
                response.data.data.id +
                " was updated successfully."
            )
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error(
                "Default Category #" +
                  this.id +
                  " was not updated due to validation errors!"
              )
            } else {
              this.$toast.error(
                "Default Category #" +
                  this.id +
                  " was not updated due to unknown server error!"
              )
            }
          })
      }
    },
    cancel() {
      this.$router.back()
    },
  },
}
</script>
