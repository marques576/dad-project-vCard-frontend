<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">VCards</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalVCards }}</h5>
    </div>
  </div>
  <hr />
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectStatus" class="form-label">Filter by type:</label>
      <select
        class="form-select"
        phone_number="selectType"
        v-model="filterByType"
      >
        <option :value="null"></option>
        <!-- <option value="D">Deposits</option>
        <option value="C">Credits</option> -->
      </select>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectCategory" class="form-label">Filter by category:</label>
      <select
        class="form-select"
        phone_number="selectOwner"
        v-model="filterByCategory"
      >
        <option :value="null"></option>
      </select>
    </div>
    <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-success px-4 btn-addprj"
        @click="addVCard"
      >
        <i class="bi bi-xs bi-plus-circle"></i>&nbsp; New VCard
      </button>
    </div>
  </div>
  <VCardsTable
    :vcards="vCards"
    @edit="editVCard"
    @delete="deleteVCard"
  ></VCardsTable>
</template>

<script>
import VCardsTable from "./VCardsTable.vue"

export default {
  name: "VCards",
  components: {
    VCardsTable,
  },
  data() {
    return {
      filterByType: null,
      filterByCategory: null,
    }
  },
  computed: {
    vCards() {
      return this.$store.getters.vcards
    },
    totalVCards() {
      return this.$store.getters.vcards.length
    },
  },
  methods: {
    addVCard() {
      // this.$router.push({ name: "NewVCard" })
    },
    editVCard(vcard) {
      console.log(vcard)
      // this.$router.push({ name: "VCard", params: { phone_number: vcard.phone_number } })
    },
    deleteVCard(vcard) {
      this.$axios
        .delete("vcards/" + vcard.phone_number)
        .then((response) => {
          let deletedVCard = response.data.data
          let phone_numberIndex = this.vcards.findIndex(
            (t) => t.phone_number === deletedVCard.phone_number
          )
          if (phone_numberIndex >= 0) {
            this.vcards.splice(phone_numberIndex, 1)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.filter-div {
  min-wphone_numberth: 12rem;
}
.total-filtro {
  margin-top: 0.35rem;
}
.btn-addprj {
  margin-top: 1.85rem;
}
</style>
