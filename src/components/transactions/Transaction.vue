<template>
  <form class="row g-3 needs-validation" @submit.prevent="save">
    <h3 class="mt-5 mb-3">{{this.$store.state.user.type == 'V' ? "Send Money" : "Create credit transaction to " + vcard}}</h3>
    <hr />

    <div class="mb-3">
      <label for="inputValue" class="form-label">Value</label>
      <input
        type="number"
        class="form-control"
        required
        min="0.01"
        step=".01"
        id="inputValue"
        placeholder="0.01"
        :class="{ 'is-invalid': errors && errors['value'] }"
        v-model="transaction.value"
      />
      <field-error-message
        :errors="errors"
        fieldName="value"
      ></field-error-message>
    </div>

    <div class="mb-3 me-3">
      <label for="inputPaymentType" class="form-label">Payment Type</label>
      <select
        class="form-select pe-2"
        id="inputPaymentType"
        v-model="transaction.payment_type"
        @change="validatePaymentReference"
      >
        <option
          v-for="type in payment_types"
          :key="type.code"
          :value="type.code"
        >
          {{ type.code }}
        </option>
      </select>
      <field-error-message
        :errors="errors"
        fieldName="payment_type"
      ></field-error-message>
    </div>

    <div class="mb-3">
      <label for="inputPaymentReference" class="form-label"
        >Payment Reference</label
      >
      <input
        type="text"
        class="form-control"
        id="inputPaymentReference"
        required
        placeholder="Insert the payment reference"
        :class="{ 'is-invalid': errors && errors['payment_reference'] }"
        v-model="transaction.payment_reference"
        ref="inputPaymentReference"
        @input="validatePaymentReference"
      />
      <field-error-message
        :errors="errors"
        fieldName="payment_reference"
      ></field-error-message>
    </div>

    <div class="mb-3 me-3" v-if="this.$store.state.user.type == 'V'">
      <label for="inputCategory" class="form-label">Category</label>
      <select
        class="form-select pe-2"
        id="inputCategory"
        v-model="transaction.category_id"
      >
        <option
          v-for="category in filtered_categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <field-error-message
        :errors="errors"
        fieldName="category_id"
      ></field-error-message>
    </div>

    <div class="mb-3" v-if="this.$store.state.user.type == 'V'">
      <label for="inputDescription" class="form-label">Description</label>
      <textarea
        rows="4"
        class="form-control"
        id="inputDescription"
        placeholder="Insert a description of the transaction here"
        v-model="transaction.description"
      />
      <field-error-message
        :errors="errors"
        fieldName="description"
      ></field-error-message>
    </div>

    <div class="mb-3" v-if="this.$store.state.user.type == 'V'">
      <label for="inputConfirmationCode" class="form-label"
        >Confirmation Code</label
      >
      <input
        type="password"
        class="form-control"
        id="inputConfirmationCode"
        required
        placeholder="Insert your confirmation code"
        :class="{ 'is-invalid': errors && errors['confirmation_code'] }"
        v-model="confirmationCode"
        ref="confirmationCode"
        @input="validateConfirmationCode"
      />
      <field-error-message
        :errors="errors"
        fieldName="confirmation_code"
      ></field-error-message>
    </div>

    <div class="mb-3 d-flex justify-content-end">
      <button type="submit" class="btn btn-success px-5">Send</button>
      <button type="button" class="btn btn-light px-5" @click="cancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Transaction",
  data() {
    return {
      transaction: this.newTransaction(),
      confirmationCode: this.$store.state.user.type == 'V' ? null : '0000',
      errors: null,
    }
  },
  computed: {
   payment_types() {
    let pt = this.$store.getters.paymentTypes;
    if (this.$store.state.user.type == 'A'){
      pt = pt.filter((type) => type.code != 'VCARD')
    }
    return pt
   },
   filtered_categories(){
     return this.$store.getters.categories.filter((c) => c.type == 'D')
   } 
  },
  props: {
    payment_type: {
      type: String,
      default: null,
    },
    payment_reference: {
      type: String,
      default: null,
    },
    vcard: {
      type: String,
      default: null
    }
  },
  watch: {
    payment_reference: function (newVal) {
      this.transaction.payment_reference = newVal
    },
    payment_type: function (newVal) {
      this.transaction.payment_type = newVal
    },
  },
  methods: {
    newTransaction() {
      return {
        vcard: this.vcard ? this.vcard : this.$store.state.user.username,
        type: this.$store.state.user.type == 'V' ? "D" : "C",
        value: null,
        payment_type: this.payment_type
          ? this.payment_type
          : this.$store.getters.paymentTypes[0].code,
        payment_reference: this.payment_reference,
      }
    },
    save() {
      this.transaction.confirmation_code = this.confirmationCode
      this.$axios
        .post("transactions", this.transaction)
        .then((response) => {
          this.$toast.success(
            "Transaction #" +
              response.data.data.id +
              " was created successfully."
          )
          if (this.transaction.payment_type == "VCARD") {
            this.$socket.emit("newTransaction", this.transaction)
          }
          if (this.$store.state.user.type == 'V'){
            this.$router.push({ name: "Dashboard" })
          } else {
            this.transaction.payment_reference = this.transaction.vcard
            this.$socket.emit("newTransaction", this.transaction)
            this.$router.push({ name: "VCards" })
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.$toast.error(
              "Transaction was not created due to validation errors!"
            )
            this.errors = error.response.data.errors
          } else {
            this.$toast.error(
              "Transaction was not created due to unknown server error!"
            )
          }
        })
    },
    cancel() {
      this.$router.back()
    },
    validatePaymentReference() {
      var constraints = { 
        phoneNumber: ["^9[0-9]{8}$", "Invalid phone number format"] ,
        iban: ["^PT50[0-9]{21}$", "Invalid IBAN format"] ,
        //eslint-disable-next-line
        paypal: ["^(.+)@(.+){2,}\.(.+){2,}$", "Invalid Paypal email format"] ,
        mastercard: ["^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$", "Invalid Mastercard format"] ,
        visa: ["^4[0-9]{12}(?:[0-9]{3})?$", "Invalid VISA format"],
        mb: ["^[0-9]{5}-[0-9]{9}$", "Invalid MB format"]
      };

      this.$refs.inputPaymentReference.setCustomValidity("")

      if (this.transaction.payment_type == 'VCARD' || this.transaction.payment_type == 'MBWAY'){
        if (!(new RegExp(constraints.phoneNumber[0]).test(this.transaction.payment_reference))){
          this.$refs.inputPaymentReference.setCustomValidity(constraints.phoneNumber[1])
        }
      }
      else if (this.transaction.payment_type == 'IBAN'){
        if (!(new RegExp(constraints.iban[0]).test(this.transaction.payment_reference))){
          this.$refs.inputPaymentReference.setCustomValidity(constraints.iban[1])
        }
      }
      else if (this.transaction.payment_type == 'PAYPAL'){
        if (!(new RegExp(constraints.paypal[0]).test(this.transaction.payment_reference))){
          this.$refs.inputPaymentReference.setCustomValidity(constraints.paypal[1])
        }
      }
      else if (this.transaction.payment_type == 'MASTERCARD'){
        if (!(new RegExp(constraints.mastercard[0]).test(this.transaction.payment_reference))){
          this.$refs.inputPaymentReference.setCustomValidity(constraints.mastercard[1])
        }
      }
      else if (this.transaction.payment_type == 'VISA'){
        if (!(new RegExp(constraints.visa[0]).test(this.transaction.payment_reference))){
          this.$refs.inputPaymentReference.setCustomValidity(constraints.visa[1])
        }
      }
      else if (this.transaction.payment_type == 'MB'){
        if (!(new RegExp(constraints.mb[0]).test(this.transaction.payment_reference))){
          this.$refs.inputPaymentReference.setCustomValidity(constraints.mb[1])
        }
      }
    },
    validateConfirmationCode(){
      this.$refs.confirmationCode.setCustomValidity("")
      if (!(new RegExp("^[0-9]{4}$").test(this.confirmationCode))){
        this.$refs.confirmationCode.setCustomValidity("Invalid confirmation code")
      }
    }
  },
}
</script>
