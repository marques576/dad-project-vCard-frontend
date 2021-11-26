import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"
import Dashboard from "../components/Dashboard.vue"
import Login from "../components/auth/Login.vue"
import ChangePassword from "../components/auth/ChangePassword.vue"
import Tasks from "../components/tasks/Tasks.vue"
import Task from "../components/tasks/Task.vue"
import Transactions from "../components/transactions/Transactions.vue"
import Project from "../components/transactions/Project.vue"
import Users from "../components/users/Users.vue"
import User from "../components/users/User.vue"
import VCards from "../components/vcards/VCards.vue"
import VCard from "../components/vcards/VCardDetail.vue"

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
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
  },
  {
    path: "/tasks/current",
    name: "CurrentTasks",
    component: Tasks,
    props: { onlyCurrentTasks: true, tasksTitle: "Current Tasks" },
  },
  {
    path: "/tasks/:id",
    name: "Task",
    component: Task,
    props: (route) => ({ id: parseInt(route.params.id) }),
  },
  {
    path: "/tasks/new",
    name: "NewTask",
    component: Task,
    props: (route) => ({
      id: null,
      fixedProject: route.params.fixedProject
        ? parseInt(route.params.fixedProject)
        : null,
    }),
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
  },
  {
    path: "/transactions/:id",
    name: "Project",
    component: Project,
    props: (route) => ({ id: parseInt(route.params.id) }),
  },
  {
    path: "/transactions/new",
    name: "NewProject",
    component: Project,
    props: () => ({ id: null }),
  },
  {
    path: "/vcards",
    name: "VCards",
    component: VCards,
  },
  {
    path: "/vcards/new",
    name: "NewVCard",
    component: VCard,
    props: { operationType: "insert" },
  },
  {
    path: "/vcards/:vcard",
    name: "VCard",
    component: VCard,
    props: (route) => ({
      vcard: parseInt(route.params.vcard),
      operationType: "update",
    }),
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
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
