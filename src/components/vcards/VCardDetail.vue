<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="save">
    <h3 class="mt-5 mb-3">{{ vcardTitle }}</h3>
    <hr />
    <div v-if="operationType == 'insert'" class="mb-3">
      <label for="inputPhoneNumber" class="form-label">Phone Number</label>
      <input
        type="text"
        class="form-control"
        id="inputPhoneNumber"
        placeholder="Your Phone Number"
        required
        v-model="editingVCard.phone_number"
      />
    </div>
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
    <div v-if="operationType == 'update' && admin" class="mb-3">
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
    <div v-if="operationType == 'update' && admin" class="mb-3">
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
    <div v-if="operationType == 'insert'" class="mb-3">
      <label for="inputPassword" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="inputPassword"
        required
        v-model="editingVCard.password"
      />
      <label for="inputPasswordConfirmation" class="form-label"
        >Password Confirmation</label
      >
      <input
        type="password"
        class="form-control"
        id="inputPasswordConfirmation"
        placeholder="Password Confirmation"
        required
        v-model="editingVCard.password_confirmation"
      />
    </div>
    <div v-if="operationType == 'insert' && admin" class="mb-3">
      <label for="inputCode" class="form-label">Code</label>
      <input
        type="password"
        class="form-control"
        id="inputCode"
        required
        v-model="editingVCard.confirmation_code"
      />
      <label for="inputCodeConfirmation" class="form-label"
        >Code Confirmation</label
      >
      <input
        type="password"
        class="form-control"
        id="inputCodeConfirmation"
        placeholder="Code Confirmation"
        required
        v-model="editingVCard.confirmation_code_confirmation"
      />
    </div>
    <div v-if="operationType == 'update' && admin" class="mb-3 checkBilled">
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

    <div
      v-if="operationType == 'update'"
      class="mb-3 d-flex justify-content-end"
    >
      <button type="button" class="btn btn-primary px-5" @click="save">
        Save
      </button>
      <button type="button" class="btn btn-light px-5" @click="cancel">
        Cancel
      </button>
    </div>
    <div v-else class="mb-3 d-flex justify-content-center">
      <button type="button" class="btn btn-primary px-5" @click="save">
        Create
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "VCardDetail",
  components: {},
  props: {
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
      admin: this.$store.state.user && this.$store.state.user.type == "A",
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
    // console.log(this.editingVCard)
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
