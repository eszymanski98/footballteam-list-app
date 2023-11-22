import { createStore } from 'vuex'

export default createStore({
  state: {
    users: []
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    addUser(state, user) {
      state.users.push(user)
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
      }
    },
    deleteUser(state, userToDelete) {
      state.users = state.users.filter(user => user !== userToDelete)
    }
  },
  actions: {
    fetchUsers({ commit }) {
    },
    addUser({ commit }, user) {
    },
    updateUser({ commit }, user) {
    },
    deleteUser({ commit }, user) {
    }
  }
})
