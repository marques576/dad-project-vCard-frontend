<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="save">
    <h3 class="mt-5 mb-3">{{ vcardTitle }}</h3>
    <hr />

    <div class="mb-3">
      <label for="inputName" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="inputName"
        placeholder="VCard Name"
        required
        v-model="editingVCard.name"
      />
      <field-error-message
        :errors="errors"
        fieldName="name"
      ></field-error-message>
    </div>

    <div class="d-flex flex-wrap justify-content-between">
      <div class="mb-3 me-3 flex-grow-1">
        <label for="inputResponsible" class="form-label">Category</label>
        <select
          class="form-select pe-2"
          id="inputResponsible"
          v-model="editingVCard.category"
        >
          <option :value="null">-- No Responsible --</option>
          <option
            v-for="category in defCategories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <field-error-message
          :errors="errors"
          fieldName="responsible_id"
        ></field-error-message>
      </div>

      <div class="mb-3 ms-xs-3 flex-grow-1">
        <label for="inputVCard" class="form-label">Status</label>
        <select
          class="form-select"
          id="inputVCard"
          v-model="editingVCard.status"
        >
          <option :value="null"></option>
          <option value="P">Pending</option>
          <option value="W">Work In Progress</option>
          <option value="C">Completed</option>
          <option value="I">Interrupted</option>
          <option value="D">Discarded</option>
        </select>
        <field-error-message
          :errors="errors"
          fieldName="status"
        ></field-error-message>
      </div>
    </div>

    <div class="mb-3">
      <label for="inputTotalHours" class="form-label">Total Hours</label>
      <input
        type="number"
        class="form-control"
        id="inputTotalHours"
        v-model="editingVCard.total_hours"
      />
      <field-error-message
        :errors="errors"
        fieldName="total_hours"
      ></field-error-message>
    </div>

    <div class="d-flex flex-wrap justify-content-between">
      <div class="mb-3 checkBilled">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="editingVCard.blocked"
            id="inputBilled"
          />
          <label class="form-check-label" for="inputBilled"
            >{{ editingVCard.blocked ? "" : "NOT " }} BLOCKED
          </label>
          <field-error-message
            :errors="errors"
            fieldName="billed"
          ></field-error-message>
        </div>
      </div>
      <div class="row mb-3 total_price" v-show="editingVCard.billed">
        <label for="inputTotalPrice" class="col-sm-3 col-form-label"
          >Total Price</label
        >
        <div class="col-sm-9">
          <input
            type="number"
            class="form-control"
            id="inputTotalPrice"
            v-model="editingVCard.total_price"
          />
          <field-error-message
            :errors="errors"
            fieldName="total_price"
          ></field-error-message>
        </div>
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
export default {
  name: "VCardDetail",
  components: {},
  props: {
    vcard: {
      type: Object,
      required: true,
    },
    operationType: {
      type: String,
      default: "insert", // insert / update
    },
    defCategories: {
      type: Array,
      required: true,
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: ["save", "cancel"],
  data() {
    return {
      editingVCard: this.vcard,
    }
  },
  watch: {
    vcard(newVCard) {
      this.editingVCard = newVCard
    },
  },
  computed: {
    vcardTitle() {
      if (!this.editingVCard) {
        return ""
      }
      return this.operationType == "insert"
        ? "New VCard"
        : "VCard #" + this.editingVCard.id
    },
  },
  methods: {
    save() {
      this.$emit("save", this.editingVCard)
    },
    cancel() {
      this.$emit("cancel", this.editingVCard)
    },
  },
  mounted() {
    console.log(this.defCategories)
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
