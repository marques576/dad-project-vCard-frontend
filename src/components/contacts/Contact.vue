<template>
  <confirmation-dialog
    ref="confirmationDialog"
    confirmationBtn="Discard changes and leave"
    msg="Do you really want to leave? You have unsaved changes!"
    @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <contact-detail
    :operationType="operation"
    :contact="contact"
    :errors="errors"
    @save="save"
    @deleteContact="deleteContact"
    @cancel="cancel"
  ></contact-detail>
</template>

<script>
import ContactDetail from "./ContactDetail.vue"

export default {
  name: "Contact",
  components: {
    ContactDetail,
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      contact: this.newContact(),
      errors: null,
    }
  },
  computed: {
    operation() {
      return !this.id || this.id < 0 ? "insert" : "update"
    },
  },
  watch: {
    id: {
      immediate: true,
      handler(newValue) {
        this.loadContact(newValue)
      },
    },
  },
  methods: {
    dataAsString() {
      return JSON.stringify(this.contact)
    },
    newContact() {
      return {
        contact: null,
        name: null,
      }
    },
    loadContact(id) {
      this.errors = null
      if (!id || id < 0) {
        this.contact = this.newContact()
        this.originalValueStr = this.dataAsString()
      } else {
        this.$axios
          .get("/contacts/" + id)
          .then((response) => {
            this.contact = response.data.data
            this.originalValueStr = this.dataAsString()
          })
          .catch(() => {
            this.$toast.error("There was an error loading the contact")
          })
      }
    },
    save() {
      this.contact.phone_number = this.$store.state.user.username
      this.errors = null
      if (this.operation == "insert") {
        this.$store
          .dispatch("insertContact", this.contact)
          .then((contact) => {
            this.$toast.success("Contact was created successfully.")
            this.contact = contact
            this.originalValueStr = this.dataAsString()
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error(
                "Contact was not created due to validation errors!"
              )
              this.errors = error.response.data.errors
            } else {
              this.$toast.error(
                "Contact was not created due to unknown server error!"
              )
            }
          })
      } else {
        this.$store
          .dispatch("updateContact", this.contact)
          .then((contact) => {
            this.$toast.success("Contact was updated successfully.")
            this.contact = contact
            this.originalValueStr = this.dataAsString()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error(
                "Contact was not updated due to validation errors!"
              )
              this.errors = error.response.data.errors
            } else {
              this.$toast.error(
                "Contact was not updated due to unknown server error!"
              )
            }
          })
      }
    },
    deleteContact() {
      this.$store
        .dispatch("deleteContact", this.contact)
        .then(() => {
          this.$toast.success("Contact was deleted successfully.")
          this.$router.back()
        })
        .catch(() => {
          this.$toast.error("Contact was not deleted due to an unknown error!")
        })
    },
    cancel() {
      this.$router.back()
    },
    leaveConfirmed() {
      if (this.nextCallBack) {
        this.nextCallBack()
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.nextCallBack = null
    let newValueStr = this.dataAsString()
    if (this.originalValueStr != newValueStr) {
      this.nextCallBack = next
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    } else {
      next()
    }
  },
}
</script>
