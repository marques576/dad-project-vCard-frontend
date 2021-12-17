<template>
  <form
    class="row g-3 needs-validation"
    @submit.prevent="save"
  >
    <div class="d-flex justify-content-between">
      <h3 class="mt-5 mb-3">{{ contactTitle }}</h3>
      <button type="button" @click="deleteContact" v-if="this.operationType != 'insert'" class="btn btn-danger d-flex justify-content-center align-items-center align-self-end" style="height: 50%;">
        <i class="bi bi-trash" style="margin: 0"></i>
      </button>
    </div>
    <hr>

    <div class="mb-3">
      <label
        for="inputPhoneNumber"
        class="form-label"
      >Phone Number</label>
      <input
        type="text"
        class="form-control"
        id="inputContact"
        placeholder="Contact phone number"
        required
        v-model="editingContact.contact"
      >
      <field-error-message
        :errors="errors"
        fieldName="contact"
      ></field-error-message>
    </div>
    
    <div class="mb-3">
      <label
        for="inputName"
        class="form-label"
      >Name</label>
      <input
        type="text"
        class="form-control"
        id="inputName"
        placeholder="Contact name"
        required
        v-model="editingContact.name"
      >
      <field-error-message
        :errors="errors"
        fieldName="name"
      ></field-error-message>
    </div>
    
    <div class="mb-3 d-flex justify-content-end">
      <button
        type="submit"
        class="btn btn-primary px-5"
      >
        Save
      </button>
      <button
        type="button"
        class="btn btn-light px-5"
        @click="cancel"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ContactDetail",
  components: {},
  props: {
    contact: {
      type: Object,
      required: true,
    },
    operationType: {
      type: String,
      default: "insert", // insert / update
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: ["save", "cancel", "deleteContact"],
  data () {
    return {
      editingContact: this.contact,
    }
  },
  watch: {
    contact (newContact) {
      this.editingContact = newContact
    },
  },
  computed: {
    contactTitle () {
      if (!this.editingContact) {
        return ""
      }
      return this.operationType == "insert"
        ? "New Contact"
        : "Contact: " + (this.editingContact.name ?? "")
    },
  },
  methods: {
    save () {
      this.$emit("save", this.editingContact)
    },
    deleteContact () {
      this.$emit("deleteContact", this.editingContact)
    },
    cancel () {
      this.$emit("cancel", this.editingContact)
    },
  },
};
</script>

<style scoped>
.total_hours {
  width: 26rem;
}
.checkCompleted {
  min-height: 2.375rem;
}
</style>
