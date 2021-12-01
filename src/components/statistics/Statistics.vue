<template>
  <h3 class="mt-5 mb-3">Statistics</h3>
  <SumYearChart
    style="width:50%; height 50%"
    v-if="date && value"
    v-bind:labels="date"
    v-bind:data="value"
  />
</template>

<script>
import { defineComponent } from "vue"
import SumYearChart from "./SumYearChart.vue"

export default defineComponent({
  name: "Statistics",
  components: {
    SumYearChart,
  },
  data() {
    return {
      transactions: [],
      date: [],
      value: [],
      merged: [],
      resultobj: [],
    }
  },
  methods: {
    loadTransactions() {
      this.$axios
        .get("transactions")
        .then((response) => {
          this.transactions = response.data.data
          if (this.$store.state.user.user_type == "V") {
            this.transactions = this.transactions.filter(
              (transaction) =>
                transaction.vcard == this.$store.state.user.username
            )
          }

          this.date = this.transactions.map((transaction) =>
            transaction.date.slice(0, 7)
          )
          this.value = this.transactions.map((transaction) => transaction.value)

          //https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects

          for (let i = 0; i < Object.keys(this.transactions).length; i++) {
            this.merged[i] = {
              date: this.date[i],
              value: this.value[i],
            }
          }

          var result = []
          var datenew = []
          var valuenew = []
          this.merged.reduce(function (res, mergedArray) {
            if (!res[mergedArray.date]) {
              res[mergedArray.date] = { date: mergedArray.date, value: 0 }
              result.push(res[mergedArray.date])
            }
            res[mergedArray.date].value += parseFloat(mergedArray.value)
            return res
          }, {})

          result.forEach(function (item) {
            valuenew.push(item.value)
            datenew.push(item.date)
          })

          this.date = datenew
          this.value = valuenew
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },

  mounted() {
    this.loadTransactions()
  },
})
</script>

<style scoped>
</style>
