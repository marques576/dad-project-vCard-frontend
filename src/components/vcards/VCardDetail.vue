<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="save">
    <h3 class="mt-5 mb-3">{{ vcardTitle }}</h3>
    <hr />

    <div class="d-flex flex-wrap justify-content-between">
      <div class="mb-3 checkBilled">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="editingVCard.blocked"
            id="inputBlocked"
          />
          <label class="form-check-label" for="inputBlocked"
            >{{ editingVCard.blocked ? "" : "NOT " }} BLOCKED
          </label>
          <field-error-message
            :errors="errors"
            fieldName="blocked"
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
    phone_number: {
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
      vcard: null,
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
        : "VCard #" + this.editingVCard.phone_number
    },
  },
  methods: {
    save() {
      this.$emit("save", this.editingVCard)
    },
    cancel() {
      this.$emit("cancel", this.editingVCard)
    },
    async loadVCard() {
      this.$axios
        .get("vcards/" + this.phone_number)
        .then((response) => {
          this.vcard = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  async beforeMount() {
    await this.loadVCard()
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
