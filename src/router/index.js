import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from "../components/Dashboard.vue"
import Login from "../components/auth/Login.vue"
import ChangePassword from "../components/auth/ChangePassword.vue"
import Tasks from "../components/tasks/Tasks.vue"
import Task from "../components/tasks/Task.vue"
import Transactions from "../components/transactions/Transactions.vue"
import Transaction from "../components/transactions/Transaction.vue"
import Users from "../components/users/Users.vue"
import User from "../components/users/User.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
  },
  {
    path: '/tasks/current',
    name: 'CurrentTasks',
    component: Tasks,
    props: { onlyCurrentTasks: true, tasksTitle: 'Current Tasks' }
  },
  {
    path: '/tasks/:id',
    name: 'Task',
    component: Task,
    props: route => ({ id: parseInt(route.params.id) })
  },
  {
    path: '/tasks/new',
    name: 'NewTask',
    component: Task,
    props: (route) => ({
      id: null,
      fixedProject: route.params.fixedProject ? parseInt(route.params.fixedProject) : null
    })
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
  },
  {
    path: '/transactions/new',
    name: 'NewTransaction',
    component: Transaction,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/users/:id',
    name: 'User',
    component: User,
    //props: true
    // Replaced with the following line to ensure that id is a number
    props: route => ({ id: parseInt(route.params.id) })
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

import store from '../store'

router.beforeEach((to, from, next) => {
  if ((to.name == 'Login') || (to.name == 'Home')) {
    next()
    return
  }
  if (!store.state.user) {
    next({ name: 'Login' })
    return
  }
  if (to.name == 'User') {
    if ((store.state.user.type == 'A') || (store.state.user.id == to.params.id)) {
      next()
      return
    }
    next(false)
    return
  }
  next()
})

export default router
