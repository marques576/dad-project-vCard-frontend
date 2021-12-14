<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="save">
    <h3 class="mt-5 mb-3">{{ vcardTitle }}</h3>
    <hr />
    <div style="width: 50%; margin: auto">
      <div v-if="operationType == 'insert'" class="mb-3">
        <label for="inputPhoneNumber" class="form-label">Phone Number</label>
        <input
          type="text"
          class="form-control"
          id="inputPhoneNumber"
          placeholder="Your Phone Number"
          required
          v-model="editingVCard.phone_number"
          v-bind:class="{
            'is-invalid': v$.editingVCard.phone_number.$error ?? false,
          }"
        />
        <span v-if="v$.editingVCard.phone_number.$error" style="color: red">
          {{ v$.editingVCard.phone_number.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="phone_number"
        ></field-error-message>
      </div>

      <div class="mb-3">
        <div v-if="operationType == 'update'">
          <div class="d-flex justify-content-center">
            <img
              :src="photo_urlPreview"
              width="200"
              height="200"
              class="rounded-circle"
              alt="avatar image"
            />
          </div>
          <br />
          <div class="d-flex justify-content-center">
            <input
              @change="onPhoto_url_change"
              class="form-control"
              ref="myFiles"
              type="file"
              accept="image/png, image/jpeg, image/gif, image/svg+xml"
            />
          </div>
          <br />

          <label class="form-label">Phone Number</label>
          <input
            type="text"
            class="form-control"
            :placeholder="editingVCard.phone_number"
            disabled
          />
          <br />
        </div>

        <label for="inputName" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="inputName"
          placeholder="Your Name"
          required
          v-model="editingVCard.name"
          v-bind:class="{
            'is-invalid': v$.editingVCard.name.$error ?? false,
          }"
        />
        <span v-if="v$.editingVCard.name.$error" style="color: red">
          {{ v$.editingVCard.name.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="name"
        ></field-error-message>
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
          v-bind:class="{
            'is-invalid': v$.editingVCard.email.$error ?? false,
          }"
        />
        <span v-if="v$.editingVCard.email.$error" style="color: red">
          {{ v$.editingVCard.email.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="email"
        ></field-error-message>
      </div>

      <div v-if="operationType == 'update' && admin" class="mb-3">
        <label for="inputBalance" class="form-label">Balance</label>
        <input
          type="text"
          class="form-control"
          id="inputBalance"
          required
          v-model="editingVCard.balance"
          v-bind:class="{
            'is-invalid': v$.editingVCard.balance.$error ?? false,
          }"
        />
        <span v-if="v$.editingVCard.balance.$error" style="color: red">
          {{ v$.editingVCard.balance.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="balance"
        ></field-error-message>
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
          v-bind:class="{
            'is-invalid': v$.editingVCard.max_debit.$error ?? false,
          }"
        />
        <span v-if="v$.editingVCard.max_debit.$error" style="color: red">
          {{ v$.editingVCard.max_debit.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="max_debit"
        ></field-error-message>
      </div>

      <div v-if="operationType == 'insert'" class="mb-3">
        <label for="inputPassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          required
          v-model="editingVCard.password"
          v-bind:class="{
            'is-invalid': v$.editingVCard.password.$error ?? false,
          }"
        />
        <span v-if="v$.editingVCard.password.$error" style="color: red">
          {{ v$.editingVCard.password.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="password"
        ></field-error-message>
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
          v-bind:class="{
            'is-invalid': v$.editingVCard.password_confirmation.$error ?? false,
          }"
        />
        <span
          v-if="v$.editingVCard.password_confirmation.$error"
          style="color: red"
        >
          {{ v$.editingVCard.password_confirmation.$errors[0].$message }}
        </span>
      </div>
      <div v-if="operationType == 'insert'" class="mb-3">
        <label for="inputCode" class="form-label">Code</label>
        <input
          type="password"
          class="form-control"
          id="inputCode"
          required
          v-model="editingVCard.confirmation_code"
          v-bind:class="{
            'is-invalid': v$.editingVCard.confirmation_code.$error ?? false,
          }"
        />
        <span
          v-if="v$.editingVCard.confirmation_code.$error"
          style="color: red"
        >
          {{ v$.editingVCard.confirmation_code.$errors[0].$message }}
        </span>
        <field-error-message
          :errors="errors"
          fieldName="confirmation_code"
        ></field-error-message>
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
          v-bind:class="{
            'is-invalid':
              v$.editingVCard.confirmation_code_confirmation.$error ?? false,
          }"
        />
        <span
          v-if="v$.editingVCard.confirmation_code_confirmation.$error"
          style="color: red"
        >
          {{
            v$.editingVCard.confirmation_code_confirmation.$errors[0].$message
          }}
        </span>
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
    </div>
  </form>
</template>



<script>
import useVuelidate from "@vuelidate/core"
import { required, sameAs, email } from "@vuelidate/validators"

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
    errors: {
      type: Object,
    },
  },
  emits: ["save", "cancel"],
  data() {
    return {
      v$: useVuelidate(),
      editingVCard: this.vcard,
      admin: this.$store.state.user && this.$store.state.user.type == "A",
      photo_urlPreview: null,
    }
  },
  validations() {
    return {
      editingVCard: {
        phone_number: { required },
        name: { required },
        email: { required, email },
        balance: { required },
        max_debit: { required },
        password: { required },
        password_confirmation: {
          required,
          sameAs: sameAs(this.editingVCard.password),
        },
        confirmation_code: { required },
        confirmation_code_confirmation: {
          required,
          sameAs: sameAs("confirmation_code"),
        },
        blocked: { required },
      },
    }
  },
  watch: {
    vcard(newVCard) {
      this.editingVCard = newVCard
      this.photo_urlPreview = this.editingVCard.photo_url
        ? this.$serverUrl + "/storage/fotos/" + this.editingVCard.photo_url
        : "img/avatar-none.png"
    },
  },
  computed: {
    vcardTitle() {
      if (!this.editingVCard) {
        return ""
      }
      return this.operationType == "insert" ? "New VCard" : "My Profile "
    },
  },
  methods: {
    save() {
      this.v$.$touch()
      this.$emit("save", this.editingVCard)
    },
    cancel() {
      this.$emit("cancel", this.editingVCard)
    },
    onPhoto_url_change(e) {
      const file = e.target.files[0]
      this.photo_urlPreview = URL.createObjectURL(file)

      var formdata = new FormData()
      formdata.append("photo_url", e.target.files[0])
      this.$axios
        .post("vcards/" + this.editingVCard.phone_number + "/photo", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response)
          this.$toast.success("Photo was updated successfully.")
          this.$store.dispatch("loadLoggedInUser")
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(
            "Photo was not updated due to unknown server error!"
          )
        })
    },
    mounted() {},
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
