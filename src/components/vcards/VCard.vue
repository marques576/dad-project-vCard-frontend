<template>
  <v-card-detail
    :operationType="operation"
    :vcard="vcard"
    :errors="errors"
    @save="save"
    @cancel="cancel"
  ></v-card-detail>
</template>

<script>
import VCardDetail from "./VCardDetail.vue"

export default {
  name: "VCard",
  components: {
    VCardDetail,
  },
  props: {
    phone_number: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      // vcard: this.loadVCard(this.phone_number),
      vcard: this.newVCard(),
      errors: null,
    }
  },
  computed: {
    operation() {
      return !this.phone_number || this.phone_number < 0 ? "insert" : "update"
    },
  },
  methods: {
    newVCard() {
      return {
        phone_number: null,
        type: "",
      }
    },
    loadVCard(phone_number) {
      if (!phone_number || phone_number < 0) {
        this.vcard = this.newVCard()
      } else {
        this.$axios
          .get("vcards/" + phone_number)
          .then((response) => {
            this.vcard = response.data.data
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    save() {
      if (this.operation == "insert") {
        console.log(this.vcard)

        this.$axios
          .post("vcards", this.vcard)
          .then((response) => {
            this.$toast.success(
              "VCard #" +
                response.data.data.phone_number +
                " was created successfully."
            )
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.errors = error.response.data.errors
              this.$toast.error(
                "VCard was not created due to validation errors!"
              )
            } else {
              this.$toast.error(
                "VCard was not created due to unknown server error!"
              )
            }
          })
      } else {
        this.$axios
          .put("vcards/" + this.phone_number, this.vcard)
          .then((response) => {
            this.$toast.success(
              "VCard #" +
                response.data.data.phone_number +
                " was updated successfully."
            )
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.errors = error.response.data.errors
              this.$toast.error(
                "VCard #" +
                  this.phone_number +
                  " was not updated due to validation errors!"
              )
            } else {
              this.$toast.error(
                "VCard #" +
                  this.phone_number +
                  " was not updated due to unknown server error!"
              )
            }
          })
      }
    },
    cancel() {
      this.$router.back()
    },
  },
  mounted() {
    this.loadVCard(this.phone_number)
  },
}
</script>
