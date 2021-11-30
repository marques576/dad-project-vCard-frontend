<template>
  <form class="row g-3 needs-validation" novalidate @submit.prevent="save">
    <h3 class="mt-5 mb-3">Send Money</h3>
    <hr />

    <div class="mb-3">
      <label for="inputValue" class="form-label">Value</label>
      <input
        type="number"
        class="form-control"
        min="0.00"
        max=""
        id="inputValue"
        placeholder="0,01"
        :class="{'is-invalid': errors && errors['value']}"
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
      >
        <option v-for="type in this.$store.getters.paymentTypes" :key="type.code" :value="type.code">
          {{ type.code }}
        </option>
      </select>
      <field-error-message
        :errors="errors"
        fieldName="payment_type"
      ></field-error-message>
    </div>

    <div class="mb-3">
      <label for="inputPaymentReference" class="form-label">Payment Reference</label>
      <input
        type="text"
        class="form-control"
        id="inputPaymentReference"
        placeholder="Insert the payment reference"
        :class="{'is-invalid': errors && errors['payment_reference']}"
        v-model="transaction.payment_reference"
      />
      <field-error-message
        :errors="errors"
        fieldName="payment_reference"
      ></field-error-message>
    </div>
    
    <div class="mb-3 me-3">
      <label for="inputCategory" class="form-label">Category</label>
      <select
        class="form-select pe-2"
        id="inputCategory"
        v-model="transaction.category_id"
      >
      </select>
      <field-error-message
        :errors="errors"
        fieldName="category_id"
      ></field-error-message>
    </div>
    
    <div class="mb-3">
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

    <div class="mb-3 d-flex justify-content-end">
      <button type="button" class="btn btn-success px-5" @click="save">
        Send
      </button>
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
      paymentTypes: [],
      errors: null
    }
  },
  methods: {
    newTransaction() {
      return {
        vcard: this.$store.state.user.username,
        type: "D",
        value: null,
        payment_type: this.$store.getters.paymentTypes[0].code,
        payment_reference: null,
      }
    },
    save() {
      this.$axios
        .post("transactions", this.transaction)
        .then((response) => {
          this.$toast.success(
            "Transaction #" +
              response.data.data.id +
              " was created successfully."
          )
          this.$router.push({name: 'Dashboard'})
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
      // Replace this code to navigate back
      // this.loadProject(this.id)
      this.$router.back()
    },
  },
}
</script>
