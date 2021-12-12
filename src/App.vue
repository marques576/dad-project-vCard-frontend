<template>
  <nav
    class="
      navbar navbar-expand-md navbar-light
      bg-white
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
            <router-link
              class="nav-link"
              :class="{ active: $route.name === 'NewVCard' }"
              :to="{ name: 'NewVCard' }"
              ><i class="bi bi-person-check-fill"></i>
              Register
            </router-link>
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
                  v-if="userType == 'V'"
                  class="dropdown-item"
                  :class="{
                    active:
                      $route.name == 'VCard' &&
                      $route.params.phone_number == userId,
                  }"
                  :to="{ name: 'VCard', params: { id: userId } }"
                  ><i class="bi bi-person-square"></i>Profile
                </router-link>
                <router-link
                  v-if="userType == 'A'"
                  class="dropdown-item"
                  :class="{
                    active: $route.name == 'User' && $route.params.id == userId,
                  }"
                  :to="{ name: 'User', params: { id: userId } }"
                  ><i class="bi bi-person-square"></i>Profile
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li v-if="userType == 'V'">
                <router-link
                  class="dropdown-item"
                  :class="{ active: $route.name === 'ChangeCode' }"
                  :to="{ name: 'ChangeCode' }"
                >
                  <i class="bi bi-key-fill"></i>Change Security Code
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  :class="{ active: $route.name === 'ChangePassword' }"
                  :to="{ name: 'ChangePassword' }"
                >
                  <i class="bi bi-key-fill"></i>Change Password
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
        v-if="user || windowWidth < 768"
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

            <li class="nav-item" v-if="userType == 'A'">
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

          <h6
            class="
              sidebar-heading
              justify-content-between
              align-items-center
              px-3
              mt-4
              mb-1
              text-muted
              d-flex
            "
            v-if="!isLoading && userType == 'V'"
          >
            <span>My Contacts</span>
            <router-link
              class="link-secondary"
              aria-label="Add a new contact"
              :to="{ name: 'New Contact' }"
              ><i class="bi bi-xs bi-plus-circle"></i>
            </router-link>
          </h6>
          <ul class="nav flex-column mb-2" v-if="!isLoading && userType == 'V'">
            <li
              class="nav-item contact"
              v-for="contact in this.$store.getters.contacts"
              :key="contact.contact"
              style="margin-top: 10px"
              :class="{
                active:
                  $route.name === 'Contact' && $route.params.id == contact.id,
              }"
            >
              <div class="d-flex">
                <router-link
                  class="
                    nav-link
                    w-100
                    me-3
                    d-flex
                    align-items-center
                    justify-content-center
                    contact-title
                  "
                  :to="{ name: 'Contact', params: { id: contact.id } }"
                >
                  {{ contact.name }}
                </router-link>
                <router-link
                  v-if="contact.contact != user.username"
                  class="d-flex align-items-center justify-content-center"
                  :to="{
                    name: 'Send Money',
                    params: {
                      payment_type: 'VCARD',
                      payment_reference: contact.contact,
                    },
                  }"
                >
                  <i class="bi bi-send"></i>
                </router-link>
                <div
                  v-if="contact.contact != user.username"
                  class="
                    contacts-last-icon
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                >
                  <i
                    class="bi bi-chat-dots"
                    style="cursor: pointer !important"
                    @click="chatWithContact(contact.contact)"
                  ></i>
                </div>
              </div>
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

      <main
        v-if="!isLoading"
        :class="{}"
        class="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        v-bind:style="[!user ? { 'margin-right': 'auto' } : {}]"
      >
        <router-view></router-view>
      </main>
    </div>
  </div>
  <button
    class="open-button"
    v-if="!isLoading && user && user.type == 'V' && !chatOpened"
    @click="openChat"
  >
    <i class="bi bi-chat" style="margin: 0"></i>
    <span
      class="totalUnreadMessages"
      v-show="this.$store.state.chat.totalUnreadMessages > 0"
      >{{ this.$store.state.chat.totalUnreadMessages }}</span
    >
  </button>
  <div
    class="chat-popup"
    v-if="!isLoading && user && user.type == 'V' && chatOpened"
    style="background-color: #fff7fa"
  >
    <div class="d-flex justify-content-between">
      <h2 style="margin: 7px">Live Chat</h2>
      <i
        @click="closeChat"
        style="color: red; cursor: pointer !important"
        class="bi bi-x-lg"
      ></i>
    </div>
    <div class="d-flex justify-content-between">
      <ul
        class="nav nav-tabs"
        :style="[activeChat ? { 'overflow-y': 'auto', height: '40px' } : {}]"
      >
        <li
          class="nav-item"
          style="cursor: pointer"
          v-for="(chat, correspondent) in this.$store.state.chat.chats"
          :key="correspondent"
          v-show="chat.opened"
        >
          <a
            @click="this.$store.state.chat.activeChat = correspondent"
            class="nav-link"
            :class="{
              active: correspondent == activeChat,
            }"
            aria-current="page"
            >{{ chat.contactName ? chat.contactName : correspondent }}
            <span
              v-if="chat.unread > 0"
              style="
                width: 20px;
                height: 20px;
                display: inline-block;
                color: white;
                text-align: center;
                border-radius: 50%;
                border-width: 1px;
                background-color: red;
                margin-left: 5px;
              "
              >{{ chat.unread }}</span
            ></a
          >
        </li>
      </ul>
      <i v-if="activeChat" class="bi bi-x-circle" @click="this.$store.commit('closeChat')" style="cursor: pointer !important;"></i>
    </div>
    <div class="chat-messages">
      <ul
        v-if="activeChat"
        style="padding: 0; margin: 0; height: 100%; overflow-y: auto"
        class="d-flex flex-column-reverse"
      >
        <li
          class="d-flex flex-column-reverse"
          v-for="(message, index) in this.$store.state.chat.chats[activeChat]
            .messages"
          :key="message"
          style="margin-bottom: 5px"
        >
          <div :class="{ 'align-self-end': message.from == user.username }">
            <span
              v-if="
                this.$store.state.chat.chats[activeChat].messages[index + 1]
                  ? this.$store.state.chat.chats[activeChat].messages[index + 1]
                      .from != message.from
                  : true
              "
              style="display: inherit; font-size: 12px"
              :class="{ 'text-end': message.from == user.username }"
              >{{
                message.from == user.username
                  ? "Me"
                  : message.contactName
                  ? message.contactName
                  : message.from
              }}</span
            >
            <span
              class="message-text"
              :class="{ 'bg-info': message.from == user.username }"
              >{{ message.text }}</span
            >
          </div>
        </li>
      </ul>
      <div v-else style="text-align: center">
        <h4>No active chats</h4>
      </div>
    </div>
    <div
      :style="[
        activeChat
          ? { height: '40px' }
          : { height: '40px', 'margin-top': '58px' },
      ]"
      class="d-flex justify-content-between align-items-center"
    >
      <input
        type="text"
        v-model="chatMessage"
        class="chat-message-input"
        style="padding: 15px"
        @keyup.enter="sendMessage(activeChat)"
      />
      <i
        @click="sendMessage(activeChat)"
        class="bi bi-send"
        style="margin-right: 20px; color: green; cursor: pointer !important"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "RootComponent",
  data() {
    return {
      isLoading: true,
      windowWidth: window.innerWidth,
      chatOpened: false,
      chatMessage: "",
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
    activeChat() {
      return this.$store.state.chat.activeChat
    },
    activeChatUnreadMessages() {
      if (this.activeChat)
        return this.$store.state.chat.chats[this.activeChat].unread
      return 0
    },
  },
  watch: {
    activeChatUnreadMessages() {
      if (this.chatOpened) {
        if (this.activeChatUnreadMessages > 0) {
          this.$store.state.chat.totalUnreadMessages -=
            this.$store.state.chat.chats[this.activeChat].unread
          this.$store.state.chat.chats[this.activeChat].unread = 0
        }
      }
    },
    activeChat(newVal, oldVal) {
      if ( this.activeChat &&
        this.chatOpened &&
        newVal != oldVal &&
        this.$store.state.chat.chats[this.activeChat].unread > 0
      ) {
        this.$store.state.chat.totalUnreadMessages -=
          this.$store.state.chat.chats[this.activeChat].unread
        this.$store.state.chat.chats[this.activeChat].unread = 0
      }
    },
    chatOpened(newVal) {
      if (
        this.activeChat &&
        newVal &&
        this.$store.state.chat.chats[this.activeChat].unread > 0
      ) {
        this.$store.state.chat.totalUnreadMessages -=
          this.$store.state.chat.chats[this.activeChat].unread
        this.$store.state.chat.chats[this.activeChat].unread = 0
      }
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
    onResize() {
      this.windowWidth = window.innerWidth
    },
    openChat() {
      this.chatOpened = true
    },
    closeChat() {
      this.chatOpened = false
    },
    sendMessage(receiver) {
      if (this.activeChat && this.chatMessage.length > 0) {
        let message = {
          from: this.user.username,
          to: receiver,
          text: this.chatMessage,
        }
        this.$socket.emit("newMessage", message)
        this.$store.commit("insertMessage", { message: message, fromMe: true })
        this.chatMessage = ""
      }
    },
    chatWithContact(contact) {
      if (!this.$store.state.chat.chats[contact]) {
        this.$store.commit("insertChat", contact)
      }
      this.$store.state.chat.activeChat = contact
      if (!this.$store.state.chat.chats[contact].opened) {
        this.$store.state.chat.chats[contact].opened = true
      }
      if (!this.chatOpened) {
        this.chatOpened = true
      }
    },
  },
  sockets: {
    newTransaction(transaction) {
      this.$toast.success(
        "You received " + transaction.value + "€ from " + transaction.vcard
      )
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize)
    })
    this.$store
      .dispatch("restoreToken")
      .then((token) => {
        if (token) {
          return this.$store.dispatch("refresh")
        }
      })
      .then(() => (this.isLoading = false))
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize)
  },
}
</script>

<style lang="css">
@import "./assets/css/dashboard.css";

.bi.bi-chat::before {
  vertical-align: 0;
}

.totalUnreadMessages {
  position: absolute;
  top: 15%;
  left: 50%;
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.message-text {
  border-radius: 15px;
  background-color: lightblue;
  display: table;
  padding: 10px;
  max-width: 200px;
  word-break: break-all;
}

.open-button {
  background-color: rgb(0, 120, 150);
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.chat-popup {
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  background-color: white;
  z-index: 9;
  width: 400px;
  height: 500px;
}

.chat-messages {
  height: 320px;
  width: calc(100% - 40px);
  margin: 20px;
}

.chat-message-input {
  width: 85%;
  margin-left: 5px;
  height: 80%;
  border-radius: 15px;
  border-width: 0;
  background-color: rgb(224, 224, 224);
}

.contact {
  border-radius: 60px;
  width: 90%;
  align-self: center;
  background-color: #ebebeb;
}
.contact.active {
  background-color: #d8d8d8;
}
.contact-title {
  margin: 0 !important;
}
.contacts-last-icon {
  margin-right: 10px;
}
.navbar-brand {
  box-shadow: none;
  background-color: transparent;
}
.sidebar {
  padding: 0;
  top: inherit;
  bottom: inherit;
  height: 100%;
}
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
