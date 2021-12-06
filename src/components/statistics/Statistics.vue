<template>
  <h3 class="mt-5 mb-3">Statistics</h3>
  <section
    id="counter"
    class="sec-padding"
    v-if="this.$store.state.user.type == 'A'"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="count">
            <span class="fa fa-smile-o"></span>
            <p class="number">{{ counters.balance }}€</p>
            <h4>Cash Inside the Platform</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="count">
            <span class="fa fa-smile-o"></span>
            <p class="number">{{ counters.vcards }}</p>
            <h4>Vcard</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="count">
            <span class="fa fa-smile-o"></span>
            <p class="number">{{ counters.average }}€</p>
            <h4>Average Transfer</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="count">
            <span class="fa fa-smile-o"></span>
            <p class="number">{{ counters.transactionCount }}</p>
            <h4>Number of Transactions</h4>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    id="counter"
    class="sec-padding"
    v-if="this.$store.state.user.type == 'V'"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="count">
            <span class="fa fa-smile-o"></span>
            <p class="number">{{ counters.value }}€</p>
            <h4>Cash movimented</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="count">
            <span class="fa fa-smile-o"></span>
            <p class="number">{{ counters.numTransactions }}</p>
            <h4>Number os transactions</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="count">
            <span class="fa fa-smile-o"></span>
            <p class="number">{{ counters.avgBalance }}€</p>
            <h4>Average Balance</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="count">
            <span class="fa fa-smile-o"></span>
            <p class="number">{{ counters.highestTransaction }}€</p>
            <h4>Highest Transaction</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
  <br><br><br>

  <div
    style=" display: flex; flex-direction: row; align-content: space-between !important width:100% margin-top: 20033px !important"
  >
    <SumYearChart
      style="width:50%; height 50%"
      v-if="date && value"
      v-bind:labels="date"
      v-bind:data="value"
    />
    <table class="table" style="margin: 0% 5% 0% 5%" :items="categories"> 
         <thead class="thead-dark">
    <tr>
      <th scope="col">Top 5 most used categories</th>
      <th scope="col">Count</th>
    </tr>
  </thead>
  <tbody>
  <tr v-for="category in categories" :key="category.name">
      <th scope="row">{{category.name.charAt(0).toUpperCase() + category.name.slice(1)}}</th>
      <td>{{category.count}}</td>
    </tr>


      </tbody>
    </table>

    <CountpaymentypePIE
      style="width:50%; height 50%;"
      v-if="dateCountpaymentypePIE && valueCountpaymentypePIE"
      v-bind:labels="dateCountpaymentypePIE"
      v-bind:data="valueCountpaymentypePIE"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue"
import SumYearChart from "./SumYearChart.vue"
import CountpaymentypePIE from "./CountpaymentypePIE.vue"

export default defineComponent({
  name: "Statistics",
  components: {
    SumYearChart,
    CountpaymentypePIE,
  },
  data() {
    return {
      sumbymonthyear: [],
      date: [],
      value: [],
      dateCountpaymentypePIE: [],
      valueCountpaymentypePIE: [],
      counters: [],
      categories: [],
    }
  },
  methods: {
    loadSumbymonthyear() {
      this.$axios
        .get("statistics/sumbymonthyear")
        .then((response) => {
          this.sumbymonthyear = response.data
          this.date = this.sumbymonthyear.map(function (el) {
            return el.yearmonth
          })
          this.value = this.sumbymonthyear.map(function (el) {
            return el.total
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    loadCountpaymentypePIE() {
      this.$axios
        .get("statistics/countpaymentype")
        .then((response) => {
          this.sumbymonthyear = response.data
          this.dateCountpaymentypePIE = this.sumbymonthyear.map(function (el) {
            return el.payment_type
          })
          this.valueCountpaymentypePIE = this.sumbymonthyear.map(function (el) {
            return el.count
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    loadCounters() {
      this.$axios
        .get("statistics/counters")
        .then((response) => {
          this.counters = response.data[0]
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadCategories() {
      this.$axios
        .get("statistics/categories")
        .then((response) => {
          this.categories = response.data
          console.log(this.categories)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },

  mounted() {
    this.loadSumbymonthyear()
    this.loadCountpaymentypePIE()
    this.loadCounters()
    this.loadCategories()
  },
})
</script>

<style scoped>
#counter {
  background-color: black;
  color: #ffffff;
  display: block;
  overflow: hidden;
  text-align: center;
  padding: 1.5rem 0;
}

#counter .count {
  padding: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-align: center;
}

.count h4 {
  color: #fff;
  font-size: 16px;
  margin-top: 0;
}

#counter .count .fa {
  font-size: 40px;
  display: block;
  color: #fff;
}

#counter .number {
  font-size: 30px;
  font-weight: 700;
  margin: 0;
}

/*  Pricing Section  */

#pricing {
  background: #f7f7f7;
}

.pricing-items {
  padding-top: 50px;
}

.pricing-item {
  background: #fff;
  position: relative;
  box-shadow: 0 0 9px 0 rgba(130, 121, 121, 0.2);
  padding: 50px 0px;
  border-top-right-radius: 2em;
  border-bottom-left-radius: 2em;
}

.pricing-item.active {
  top: -50px;
}

.price-list li {
  list-style: none;
  margin-bottom: 15px;
}

.price-list .price {
  font-size: 30px;
  font-weight: bold;
}

.pricing-item .ribbon {
  margin: -50px 0 20px;
  display: block;
  background-color: #4e73df;
  padding: 15px 0 2px;
  opacity: 0.8;
  border-top-right-radius: 2em;
}

.pricing-item:hover .ribbon {
  background-color: #4e73df;
  opacity: 1;
}

.pricing-item.active .ribbon {
  background-color: #4e73df;
  opacity: 1;
}

.pricing-item .ribbon p {
  color: #fff;
  font-size: 22px;
  margin: 0 0 10px;
  font-weight: 600;
}

.pricing-item.active .price-list li,
.pricing-item:hover .price-list li {
  color: #848181;
}

ul.price-list {
  margin-bottom: 30px;
  padding: 0;
}

.btn-price {
  display: inline-block;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  padding: 14px 40px;
  -webkit-border-radius: 26px;
  -moz-border-radius: 26px;
  -o-border-radius: 26px;
  border-radius: 26px;
  border: 1px solid #848181;
  background-color: transparent;
  color: #848181;
}

.pricing-item:hover .btn-price,
.active .btn-price {
  border: 1px solid #4e73df;
  background-color: #4e73df;
  color: #fff;
}

.btn-price:focus {
  background-color: transparent;
  text-decoration: none;
}

@media only screen and (max-width: 767px) {
  .pricing-items {
    padding-top: 0;
  }

  .pricing-item.active {
    top: 20px;
    margin-bottom: 40px;
  }
}
</style>
