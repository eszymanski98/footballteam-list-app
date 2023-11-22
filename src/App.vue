<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <router-view :users="users" @add="addUser" @delete="deleteUser" @update="updateUser" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      nextId: 1
    }
  },
  methods: {
    async fetchUsers() {
      for(let i = 1; i <= 5; i++) {
        const response = await axios.get(`https://reqres.in/api/users?page=${i}`)
        this.users = [...this.users, ...response.data.data]
      }
      this.nextId = this.users.length + 1
    },
    addUser(user) {
      user.id = this.nextId++
      this.users.push(user)
    },
    deleteUser(id) {
      this.users = this.users.filter(user => user.id !== id)
    },
    updateUser(updatedUser) {
      const index = this.users.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        this.users.splice(index, 1, updatedUser)
      }
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>
