<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="save">
    <h3 class="mt-5 mb-3">{{ defaultCategoryTitle }}</h3>
    <hr />

    <div class="mb-3">
      <label for="inputName" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="inputName"
        placeholder="Default Category Name"
        required
        v-model="editingDefaultCategory.name"
      />
      <span v-if="v$.editingCategory.name.$error" style="color: red">
        {{ v$.editingCategory.name.$errors[0].$message }}
      </span>
      <field-error-message
        :errors="errors"
        fieldName="name"
      ></field-error-message>
    </div>

    <div class="d-flex flex-wrap justify-content-between">
      <div class="mb-3 ms-xs-3 flex-grow-1">
        <label for="inputDefaultCategory" class="form-label">Type</label>
        <select
          class="form-select"
          id="inputDefaultCategory"
          v-model="editingDefaultCategory.type"
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
  name: "DefaultCategoryDetail",
  components: {},
  props: {
    defaultCategory: {
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
      editingDefaultCategory: this.defaultCategory,
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
    defaultCategory(newDefaultCategory) {
      this.editingDefaultCategory = newDefaultCategory
    },
  },
  computed: {
    defaultCategoryTitle() {
      if (!this.editingDefaultCategory) {
        return ""
      }
      return this.operationType == "insert"
        ? "New Default Category"
        : "Default Category #" + this.editingDefaultCategory.id
    },
  },
  methods: {
    save() {
      this.$emit("save", this.editingDefaultCategory)
    },
    cancel() {
      this.$emit("cancel", this.editingDefaultCategory)
    },
  },
}
</script>

<style scoped>
.total_price {
  width: 26rem;
}
.checkBilled {
  margin-top: 0.4rem;
  min-height: 2.375rem;
}
</style>
