<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="save">
    <h3 class="mt-5 mb-3">{{ categoryTitle }}</h3>
    <hr />

    <div class="mb-3">
      <label for="inputName" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="inputName"
        placeholder="Category Name"
        required
        v-model="editingCategory.name"
      />
      <span v-if="v$.editingCategory.name.$error" style="color: red">
        {{ v$.editingCategory.name.$errors[0].$message }}
      </span>
      <field-error-message
        :errors="errors"
        fieldName="name"
      ></field-error-message>
    </div>

    <div class="mb-3 me-3 flex-grow-1">
      <label for="inputVCard" class="form-label">VCard</label>
      <input
        type="text"
        class="form-control"
        id="inputVCard"
        :placeholder="category.vcard"
        v-model="editingCategory.vcard"
        disabled
      />
    </div>

    <div class="d-flex flex-wrap justify-content-between">
      <div class="mb-3 ms-xs-3 flex-grow-1">
        <label for="inputCategory" class="form-label">Type</label>
        <select
          class="form-select"
          id="inputCategory"
          v-model="editingCategory.type"
        >
          <option :value="null"></option>
          <option value="C">Crédito</option>
          <option value="D">Débito</option>
        </select>

        <span v-if="v$.editingCategory.type.$error" style="color: red">
          {{ v$.editingCategory.type.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="type"
        ></field-error-message>
      </div>
    </div>

    <div class="mb-3 d-flex justify-content-end">
      <button type="button" class="btn btn-primary px-5" @click="save">
        Save
      </button>
      <button type="button" class="btn btn-light px-5" @click="cancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"

export default {
  name: "CategoryDetail",
  components: {},
  props: {
    category: {
      type: Object,
      required: true,
    },
    operationType: {
      type: String,
      default: "insert", // insert / update
    },
    errors: {
      type: Object,
    },
  },
  emits: ["save", "cancel"],
  data() {
    return {
      v$: useVuelidate(),
      editingCategory: this.category,
    }
  },
  validations() {
    return {
      editingCategory: {
        name: { required },
        type: { required },
      },
    }
  },
  watch: {
    category(newCategory) {
      this.editingCategory = newCategory
    },
  },
  computed: {
    categoryTitle() {
      if (!this.editingCategory) {
        return ""
      }

      return this.operationType == "insert"
        ? "New Category"
        : "Category #" + this.editingCategory.id
    },
  },
  methods: {
    save() {
      this.v$.$touch()
      if (!this.v$.$error) {
        this.$emit("save", this.editingCategory)
      }
    },
    cancel() {
      this.$emit("cancel", this.editingCategory)
    },
  },
}
</script>

<style scoped></style>
