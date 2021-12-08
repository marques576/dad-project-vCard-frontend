<template>
  <nav
    class="
      navbar navbar-expand-md navbar-dark
      bg-dark
      sticky-top
      flex-md-nowrap
      p-0
      shadow
    "
  >
    <div class="container-fluid">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"
        ><img
          src="./assets/logo.png"
          alt=""
          width="30"
          height="26"
          class="d-inline-block align-text-top"
        />
        VCards</a
      >
      <button
        id="buttonSidebarExpandId"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item" v-show="!user">
            <a class="nav-link" href="#"
              ><i class="bi bi-person-check-fill"></i>
              Register
            </a>
          </li>
          <li class="nav-item" v-show="!user">
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'Login' }"
              :to="{ name: 'Login' }"
              ><i class="bi bi-box-arrow-in-right"></i>
              Login
            </router-link>
          </li>
          <li class="nav-item dropdown" v-show="user">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="userPhotoUrl"
                class="rounded-circle z-depth-0 avatar-img"
                alt="avatar image"
              />
              <span class="avatar-text">{{ userName }}</span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <router-link
                  class="dropdown-item"
                  :class="{
                    active: $route.name == 'User' && $route.params.id == userId,
                  }"
                  :to="{ name: 'User', params: { id: userId } }"
                  ><i class="bi bi-person-square"></i>Profile
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :class="{ active: $route.name === 'ChangePassword' }"
                  :to="{ name: 'ChangePassword' }"
                >
                  <i class="bi bi-key-fill"></i>Change password
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" @click.prevent="logout"
                  ><i class="bi bi-arrow-right"></i>Logout</a
                >
              </li>
            </ul>
          </li>
          <li class="nav-item d-flex" v-show="user">
            <a class="nav-link align-self-center" @click.prevent="refresh">
              <i class="bi bi-arrow-clockwise"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid">
    <div class="row">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div class="position-sticky pt-3">
          <ul class="nav flex-column" v-show="user">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.name === 'Dashboard' }"
                :to="{ name: 'Dashboard' }"
                ><i class="bi bi-house"></i>
                Dashboard
              </router-link>
            </li>

            <li class="nav-item" v-if="!isLoading && userType == 'V'">
              <router-link
                class="nav-link w-100 me-3"
                :class="{ active: $route.name === 'Transactions' }"
                :to="{ name: 'Transactions' }"
              >
                <i class="bi bi-arrow-down-up"></i>
                Transactions
              </router-link>
            </li>
            <li class="nav-item" v-if="userType == 'A'">
              <router-link
                class="nav-link w-100 me-3"
                :class="{ active: $route.name === 'DefaultCategories' }"
                :to="{ name: 'DefaultCategories' }"
              >
                <i class="bi bi-tag"></i>
                Default Categories
              </router-link>
            </li>

            <li class="nav-item" v-else>
              <router-link
                class="nav-link w-100 me-3"
                :class="{ active: $route.name === 'Categories' }"
                :to="{ name: 'Categories' }"
              >
                <i class="bi bi-tag"></i>
                Categories
              </router-link>
            </li>

            <li class="nav-item" v-if="!isLoading && userType == 'V'">
              <router-link
                class="nav-link w-100 me-3"
                :class="{ active: $route.name === 'Send Money' }"
                :to="{ name: 'Send Money' }"
              >
                <i class="bi bi-send"></i>
                Send Money
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link w-100 me-3"
                :class="{ active: $route.name === 'VCards' }"
                :to="{ name: 'VCards' }"
              >
                <i class="bi bi-credit-card"></i>
                VCards
              </router-link>
            </li>
            <li
              class="
                nav-item
                d-flex
                justify-content-between
                align-items-center
                pe-3
              "
              v-if="!isLoading && userType == 'A'"
            >
              <router-link
                class="nav-link w-100 me-3"
                :class="{ active: $route.name === 'Users' }"
                :to="{ name: 'Users' }"
              >
                <i class="bi bi-list-check"></i>
                Administrators
              </router-link>
              <router-link
                class="link-secondary"
                :to="{ name: 'NewUser' }"
                aria-label="Add a new task"
                ><i class="bi bi-xs bi-plus-circle"></i>
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link w-100 me-3"
                :class="{ active: $route.name === 'Statistics' }"
                :to="{ name: 'Statistics' }"
              >
                <i class="bi bi-bar-chart-line"></i>
                Statistics
              </router-link>
            </li>
          </ul>

          <div class="d-block d-md-none">
            <h6
              class="
                sidebar-heading
                d-flex
                justify-content-between
                align-items-center
                px-3
                mt-4
                mb-1
                text-muted
              "
            >
              <span>User</span>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item" v-show="!user">
                <a class="nav-link" href="#"
                  ><i class="bi bi-person-check-fill"></i>
                  Register
                </a>
              </li>
              <li class="nav-item" v-show="!user">
                <router-link
                  class="nav-link"
                  :class="{ active: $route.name === 'Login' }"
                  :to="{ name: 'Login' }"
                  ><i class="bi bi-box-arrow-in-right"></i>
                  Login
                </router-link>
              </li>
              <li class="nav-item" v-show="user">
                <a class="nav-link" @click.prevent="refresh">
                  <i class="bi bi-arrow-clockwise"></i>
                  Refresh
                </a>
              </li>
              <li class="nav-item dropdown" v-show="user">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    :src="userPhotoUrl"
                    class="rounded-circle z-depth-0 avatar-img"
                    alt="avatar image"
                  />
                  <span class="avatar-text">{{ userName }}</span>
                </a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink2"
                >
                  <li>
                    <router-link
                      class="dropdown-item"
                      :class="{
                        active:
                          $route.name == 'User' && $route.params.id == userId,
                      }"
                      :to="{ name: 'User', params: { id: userId } }"
                      ><i class="bi bi-person-square"></i>Profile
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                      :class="{ active: $route.name === 'ChangePassword' }"
                      :to="{ name: 'ChangePassword' }"
                      ><i class="bi bi-key-fill"></i>Change
                      password</router-link
                    >
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" @click.prevent="logout"
                      ><i class="bi bi-arrow-right"></i>Logout</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main v-if="!isLoading" class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "RootComponent",
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    workInProgressProjects() {
      return this.$store.getters.myInProgressProjects
    },
    user() {
      return this.$store.state.user
    },
    userType() {
      return this.$store.state.user ? this.$store.state.user.type : ""
    },
    userId() {
      return this.$store.state.user ? this.$store.state.user.id : -1
    },
    userName() {
      return this.$store.state.user ? this.$store.state.user.name : ""
    },
    userPhotoUrl() {
      let urlPhoto = this.$store.state.user
        ? this.$store.state.user.photo_url
        : null
      return urlPhoto
        ? this.$serverUrl + "/storage/fotos/" + urlPhoto
        : "img/avatar-none.png"
    },
  },
  methods: {
    refresh() {
      this.$store.dispatch("refresh")
    },
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$toast.success("User has logged out of the application.")
          this.$router.push({ name: "Home" })
        })
        .catch(() => {
          this.$toast.error(
            "There was a problem logging out of the application!"
          )
        })
    },
  },
  sockets: {
    newTransaction(transaction) {
      this.$toast.success("You received " + transaction.value + "€ from " + transaction.vcard)
    },
  },
  mounted() {
    this.$store
      .dispatch("restoreToken")
      .then((token) => {
        if (token) {
          return this.$store.dispatch("refresh")
        }
      })
      .then(() => (this.isLoading = false))
  },
}
</script>

<style lang="css">
@import "./assets/css/dashboard.css";

.avatar-img {
  margin-right: 0.6rem;
  width: 2.2rem;
}
.avatar-text {
  line-height: 2.2rem;
  margin: 1rem 0.5rem -2rem 0;
  padding-top: 1rem;
}

.dropdown-item {
  font-size: 0.875rem;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

#sidebarMenu {
  overflow-y: auto;
}
</style>
