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
        placeholder="Your Name"
        required
        v-model="editingVCard.name"
      />
    </div>
    <div class="mb-3">
      <label for="inputEmail" class="form-label">Email</label>
      <input
        type="text"
        class="form-control"
        id="inputEmail"
        placeholder="youremail@mail.pt"
        required
        v-model="editingVCard.email"
      />
    </div>
    <div class="mb-3">
      <label for="inputBalance" class="form-label">Balance</label>
      <input
        type="text"
        class="form-control"
        id="inputBalance"
        placeholder="13230.74€"
        required
        v-model="editingVCard.balance"
      />
    </div>
    <div class="mb-3">
      <label for="inputMaxDebit" class="form-label">Max Debit</label>
      <input
        type="text"
        class="form-control"
        id="inputMaxDebit"
        placeholder="500.0€"
        required
        v-model="editingVCard.max_debit"
      />
    </div>
    <div class="mb-3 checkBilled">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="editingVCard.blocked"
          v-bind:true-value="1"
          v-bind:false-value="0"
          id="inputBlocked"
        />
        <label class="form-check-label" for="inputBlocked"> Blocked </label>
      </div>
    </div>

    <!-- <div class="mb-3 me-3 flex-grow-1">
      <label for="inputCategory" class="form-label">Category</label>
      <select
        class="form-select pe-2"
        id="inputCategory"
        v-model="editingVCard.category"
      >
        <option
          v-for="category in defaultCategories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div> -->

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
    // defaultCategories: {
    //   type: Array,
    //   required: true,
    // },
    operationType: {
      type: String,
      default: "insert", // insert / update
    },
    vcard: {
      type: Object,
      required: true,
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
  },
  mounted() {
    console.log(this.editingVCard)
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
