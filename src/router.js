import { createRouter, createWebHistory } from 'vue-router'
import UserList from './components/UserList.vue'
import AddUser from './components/AddUser.vue'
import EditUser from './components/EditUser.vue'

const routes = [
  {
    path: '/',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/add',
    name: 'AddUser',
    component: AddUser
  },
  {
    path: '/edit/:id',
    name: 'EditUser',
    component: EditUser,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router