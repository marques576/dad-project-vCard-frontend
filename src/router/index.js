import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"
import Dashboard from "../components/Dashboard.vue"
import Login from "../components/auth/Login.vue"
import ChangePassword from "../components/auth/ChangePassword.vue"
import ChangeCode from "../components/auth/ChangeSecurityCode.vue"
import Transactions from "../components/transactions/Transactions.vue"
import Transaction from "../components/transactions/Transaction.vue"
import Users from "../components/users/Users.vue"
import User from "../components/users/User.vue"
import NewUser from "../components/users/NewUser.vue"
import Category from "../components/categories/Category.vue"
import Categories from "../components/categories/Categories.vue"
import VCards from "../components/vcards/VCards.vue"
import Statistics from "../components/statistics/Statistics.vue"
import DefaultCategory from "../components/defaultCategories/DefaultCategory.vue"
import DefaultCategories from "../components/defaultCategories/DefaultCategories.vue"
import VCard from "../components/vcards/VCard.vue"
import Contact from "../components/contacts/Contact.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/password",
    name: "ChangePassword",
    component: ChangePassword,
  },
  {
    path: "/securitycode",
    name: "ChangeCode",
    component: ChangeCode,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
  },
  {
    path: "/transactions/new",
    name: "Send Money",
    component: Transaction,
    props: true,
  },
  {
    path: "/transactions/new/:vcard",
    name: "Create Credit Transaction",
    component: Transaction,
    props: (route) => ({
      vcard: route.params.vcard
    }),
  },
  {
    path: "/vcards",
    name: "VCards",
    component: VCards,
  },
  {
    path: "/register",
    name: "NewVCard",
    component: VCard,
    props: { operationType: "insert" },
  },
  {
    path: "/vcards/:id",
    name: "VCard",
    component: VCard,
    props: (route) => ({
      phone_number: parseInt(route.params.id),
    }),
  },
  {
    path: '/contacts/:id',
    name: 'Contact',
    component: Contact,
    props: route => ({ id: parseInt(route.params.id) })
  },
  {
    path: '/contacts/new',
    name: 'New Contact',
    component: Contact,
    props: () => ({
      id: null,
    })
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/users/:id",
    name: "User",
    component: User,
    //props: true
    // Replaced with the following line to ensure that id is a number
    props: (route) => ({ id: parseInt(route.params.id) }),
  },
  {
    path: "/users/new",
    name: "NewUser",
    component: NewUser,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/categories/new",
    name: "NewCategory",
    component: Category,
    props: () => ({ id: null }),
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
  },
  {
    path: "/categories/:id",
    name: "Category",
    component: Category,
    props: (route) => ({ id: parseInt(route.params.id) }),
  },

  {
    path: "/defaultCategories",
    name: "DefaultCategories",
    component: DefaultCategories,
  },
  {
    path: "/defaultCategories/new",
    name: "NewDefaultCategory",
    component: DefaultCategory,
    props: () => ({ id: null }),
  },
  {
    path: "/defaultCategories/:id",
    name: "DefaultCategory",
    component: DefaultCategory,
    props: (route) => ({ id: parseInt(route.params.id) }),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

import store from "../store"

router.beforeEach((to, from, next) => {
  document.title = to.name
  if (to.name == "Login" || to.name == "NewVCard" || to.name == "Home") {
    next()
    return
  }
  if (!store.state.user) {
    next({ name: "Login" })
    return
  }
  if (to.name == "User") {
    if (store.state.user.type == "A" || store.state.user.id == to.params.id) {
      next()
      return
    }
    next(false)
    return
  }
  next()
})

export default router
