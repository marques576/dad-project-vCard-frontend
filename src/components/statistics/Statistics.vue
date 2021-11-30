<template>
  <h3 class="mt-5 mb-3">Statistics</h3>
</template>

<script>


export default {
  name: 'Statistics',
  components: {
  },
  data () {
    return {
        transactions: []
    }
  },
  computed: {
  },
  methods: {
    loadTransactions () {
      this.$axios.get('transactions')
        .then((response) => {
          this.transactions = response.data.data
          if(this.$store.state.user.user_type == "V"){
              this.transactions = this.transactions.filter(transaction => transaction.vcard == this.$store.state.user.username)
          }
          console.log(this.transactions)
        })
        .catch((error) => {
          console.log(error)
        })
    },
   
  },
  mounted () {
    this.loadTransactions()
  }
}
</script>

<style scoped>

</style>
