<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Dashboard</h3>
    </div>
  </div>
  <hr />
  <div class="main-panel">
    <div class="row">
      <div
        class="col-md-4 stretch-card grid-margin"
        style="text-decoration: none"
      >
        <div class="card bg-gradient-danger card-img-holder text-white">
          <div class="card-body">
            <img
              src="../../assets/img/circle.svg"
              class="card-img-absolute"
              alt="circle-image"
            />
            <h4 class="font-weight-normal mb-3">Balance</h4>
            <h1 class="mb-4">{{ $store.state.vcard.balance }} €</h1>
            <h6 class="card-text"></h6>
          </div>
        </div>
      </div>
      <div
        class="col-md-4 stretch-card grid-margin"
        style="text-decoration: none"
      >
        <div class="card bg-gradient-info card-img-holder text-white">
          <div class="card-group">
            <div class="card" id="creditCard">
              <div class="logo">
                <img
                  src="../../assets/img/Visa-Logo-PNG-Image.png"
                  alt="Visa"
                />
              </div>
              <div class="chip">
                <img src="../../assets/img/chip.png" alt="chip" />
              </div>
              <div class="number">{{ $store.state.user.id }}</div>
              <div class="name">{{ $store.state.user.name }}</div>
              <div class="ring"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-md-4 stretch-card grid-margin"
        style="text-decoration: none"
      >
        <div class="card bg-gradient-success card-img-holder text-white">
          <div class="card-body">
            <h4 class="font-weight-normal mb-3">Last Transactions</h4>

            <table
              class="
                table table-sm table-borderless
                text-white
                d-flex
                justify-content-left
              "
            >
              <tbody>
                <tr
                  v-for="transaction in transactions"
                  :key="transaction.id"
                >
            
                  <div style="color: #90ee90" v-if="transaction.type == 'C'">
                    <td>
                      <i
                        :class="[
                          transaction.type == 'C'
                            ? 'bi bi-arrow-down-circle-fill'
                            : 'bi bi-arrow-up-circle-fill',
                        ]"
                      ></i>
                    </td>
                    <td>
                      <h3>{{ transaction.value }}€</h3>
                    </td>
                  </div>

                  <div style="color: #f47174" v-if="transaction.type == 'D'">
                    <td>
                      <i
                        :class="[
                          transaction.type == 'C'
                            ? 'bi bi-arrow-down-circle-fill'
                            : 'bi bi-arrow-up-circle-fill',
                        ]"
                      ></i>
                    </td>
                    <td>
                      <h3>{{ transaction.value }}€</h3>
                    </td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        class="col-md-4 stretch-card grid-margin"
        style="text-decoration: none"
      >
        <div class="card bg-gradient-dark card-img-holder text-white">
          <div class="card-body">
            <h4 class="font-weight-normal mb-3">Contacts</h4>
            <table
              class="
                table table-sm table-borderless
                text-white
                d-flex
                justify-content-left
              "
            >
              <tbody>
                <tr
                  v-for="contact in this.$store.getters.contacts"
                  :key="contact.contact"
                >
                    <td>
                      <h3>{{contact.name}}</h3>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BalanceOverTime
    height="50"
    v-if="date && value"
    v-bind:labels="date"
    v-bind:data="value"
  />
</template>
<script>
import { defineComponent } from "vue"
import BalanceOverTime from "./BalanceOverTime.vue"
export default defineComponent({
  name: "VCardDashboard",
  components: {
    BalanceOverTime,
  },
  data() {
    return {
      date: [],
      value: [],
      transactions: [],
    }
  },

  methods: {
    loadBalanceOverTime() {
      this.$axios
        .get("statistics/balanceovertime")
        .then((response) => {
          this.balanceOverTime = response.data
          this.date = this.balanceOverTime.map(function (el) {
            return el.date
          })
          this.value = this.balanceOverTime.map(function (el) {
            return el.balance
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
     loadTransactionsDesc() {
      this.$axios
        .get("vcards/"+ this.$store.state.user.id + "/transactions?order=desc")
        .then((response) => {
          this.transactions = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.loadBalanceOverTime()
    this.loadTransactionsDesc()
  },
})
</script>

<style>
.main-panel {
  vertical-align: top;
  -ms-transform: translateY(0%);
  transform: translateY(0%);
}

.row {
  display: flex;
  justify-content: center;
}

.float-right {
  float: right !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

img {
  vertical-align: middle;
  border-style: none;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}

.h2,
h2 {
  font-size: 2rem;
}

.h4,
h4 {
  font-size: 1.5rem;
}

.h6,
h6 {
  font-size: 1rem;
}

.card {
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.3125rem;
}

.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
}

.card-text:last-child {
  margin-bottom: 0;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-5 {
  margin-bottom: 3rem !important;
}

.font-weight-normal {
  font-weight: 400 !important;
}

.text-white {
  color: #fff !important;
}

div,
h1,
h2,
h3,
h4,
h5 {
  text-shadow: none;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: ubuntu-medium, sans-serif;
}

h1 {
  font-size: 5.5rem;
}

.h2,
h2 {
  font-size: 1.88rem;
}

.h4,
h4 {
  font-size: 1.13rem;
}

.h6,
h6 {
  font-size: 0.9375rem;
}

.grid-margin {
  margin-bottom: 2.5rem;
}

.stretch-card > .card {
  width: 100%;
  min-width: 100%;
}

.font-weight-normal {
  font-family: ubuntu-regular, sans-serif;
}

.bg-gradient-primary {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#da8cff),
    to(#9a55ff)
  ) !important;
  background: linear-gradient(to right, #da8cff, #9a55ff) !important;
}

.bg-gradient-secondary {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#e7ebf0),
    to(#868e96)
  ) !important;
  background: linear-gradient(to right, #e7ebf0, #868e96) !important;
}

.bg-gradient-success {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#84d9d2),
    to(#07cdae)
  ) !important;
  background: linear-gradient(to right, #84d9d2, #07cdae) !important;
}

.bg-gradient-info {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#90caf9),
    color-stop(99%, #047edf)
  ) !important;
  background: linear-gradient(to right, #90caf9, #047edf 99%) !important;
}

.bg-gradient-warning {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#f6e384),
    to(#ffd500)
  ) !important;
  background: linear-gradient(to right, #f6e384, #ffd500) !important;
}

.bg-gradient-danger {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ffbf96),
    to(#fe7096)
  ) !important;
  background: linear-gradient(to right, #ffbf96, #fe7096) !important;
}

.bg-gradient-light {
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#f4f4f4),
    to(#e4e4e9)
  ) !important;
  background: linear-gradient(to bottom, #f4f4f4, #e4e4e9) !important;
}

.bg-gradient-dark {
  background: linear-gradient(89deg, #5e7188, #3e4b5b) !important;
}

.card {
  border: 0;
  background: #fff;
}

.card .card-body {
  padding: 2.5rem 2.5rem;
}

.card.card-img-holder {
  position: relative;
}

.card.card-img-holder .card-img-absolute {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}

.card-group {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card {
  position: relative;
  height: 270px;
  width: 495px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.logo img,
.chip img,
.number,
.name,
.from,
.to,
.ring {
  position: absolute;
  /* All items inside card should have absolute position */
}

.logo img {
  top: 35px;
  right: 40px;
  width: 80px;
  height: auto;
  opacity: 0.8;
}

.chip img {
  top: 120px;
  left: 40px;
  width: 50px;
  height: auto;
  opacity: 0.8;
}

.number,
.name {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 800;
  letter-spacing: 2px;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  font-size: 1.5rem;
}

.number {
  left: 40px;
  bottom: 65px;
  font-family: "Nunito", sans-serif;
}

.name {
  font-size: 1rem;
  left: 40px;
  bottom: 35px;
}
</style>
