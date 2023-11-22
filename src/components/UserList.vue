<template>
  <div class="bg-gray-200 h-screen pt-10 pb-2">
    <div class="overflow-hidden mx-4 md:mx-20 lg:mx-20 xl:mx-60">
      <div class="text-4xl mb-7 font-normal ml-1">User list</div>
      <div class="w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto pb-10">
        <div class="flex justify-between items-center px-6 py-8 border-b border-gray-200">
          <div class="relative w-full md:w-2/5 ">
            <input v-model="search" type="text" placeholder="Search for users..." class="rounded px-3 pr-10 py-2 w-full bg-gray-100 font-semibold text-gray-500 transition-colors duration-200 hover:border-gray-300 active:bg-gray-200 outline-none">
            <span class="absolute right-0 top-0 mt-2 mr-4">
              <i class="fa fa-search text-gray-500"></i>
            </span>
          </div>
          <router-link to="/add" class="px-5 py-2 bg-green-600 text-white font-semibold rounded-full shadow flex items-center mt-4 md:mt-0 hover:bg-green-700 transition-colors duration-200 active:bg-green-800">
            <i class="fa fa-plus mr-2"></i>
            Add User
          </router-link>
        </div>
        <div class="px-6 pt-6 pb-3 flex justify-between w-full">
          <div class="text-lg font-bold mr-10 ml-[9.5rem]">Full Name</div>
          <div class="text-lg font-bold text-right mr-[5.8rem] ">Action</div>
        </div>
        <div v-for="(user, index) in paginatedUsers" :key="user.id" class="flex items-center space-x-4 px-6 py-2 mx-8 rounded-lg" :class="{ 'bg-gray-100': index % 2 === 0, 'bg-white': index % 2 !== 0 }">
          <img :src="user.avatar || 'https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'" alt="User's avatar" class="w-12 h-12 my-px rounded-full mr-14 object-cover" />
          <div class="flex-grow">
            <div class="text-lg font-medium mr-2">{{ user.first_name }} {{ user.last_name }}</div>
          </div>
          <div class="ml-auto flex space-x-4 pr-16">
            <router-link :to="`/edit/${user.id}`" class="text-gray-400 hover:text-gray-500 transition-colors duration-200 active:text-gray-800">
              <i class="fa fa-edit"></i>
            </router-link>
            <button @click="deleteUser(user.id)" class="text-gray-400 hover:text-red-500 transition-colors duration-200 active:text-red-700">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="pt-2 mt-4 flex justify-start items-center">
  <div class="flex divide-gray-300">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" :class="currentPage === 1 ? 'px-4 py-2 rounded-l shadow bg-white text-black' : 'px-4 py-2 rounded-l shadow bg-white text-green-600 hover:bg-green-700 transition-colors duration-200 active:bg-green-800'">
      «
    </button>
    <template v-if="totalPages <= 5">
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ 'bg-green-600 text-white': currentPage === page, 'bg-white text-green-600': currentPage !== page, 'hover:bg-green-700 hover:text-white': currentPage !== page }" class="px-4 py-2 shadow transition-colors duration-200 active:bg-green-800">{{ page }}</button>
    </template>
    <template v-else>
      <button v-for="page in getVisiblePages()" :key="page" @click="goToPage(page)" :class="{ 'bg-green-600 text-white': currentPage === page, 'bg-white text-green-600': currentPage !== page, 'hover:bg-green-700 hover:text-white': currentPage !== page }" class="px-4 py-2 shadow transition-colors duration-200 active:bg-green-800">{{ page }}</button>
    </template>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" :class="currentPage === totalPages ? 'px-4 py-2 rounded-r shadow bg-white text-black' : 'px-4 py-2 rounded-r shadow bg-white text-green-600 hover:bg-green-700 transition-colors duration-200 active:bg-green-800'">
      »
    </button>
  </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      search: '',
      itemsPerPage: 1,
      defaultAvatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredUsers.slice(start, start + this.itemsPerPage)
    },
    filteredUsers() {
      const searchWords = this.search.trim().toLowerCase().split(' ')
      if (!searchWords.length) {
        return this.users
      }
      return this.users.filter(user => {
        const fullName = (user.first_name + ' ' + user.last_name).toLowerCase()
        return searchWords.every(word => fullName.includes(word))
      })
    }
  },
  methods: {
    deleteUser(id) {
      this.$emit('delete', id)
    },
    goToPage(page) {
      if (page === 'First') {
        this.currentPage = 1;
      } else if (page === 'Last') {
        this.currentPage = this.totalPages;
      } else if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    getVisiblePages() {
      const visiblePages = [];
      const buffer = 2;

      for (let i = Math.max(1, this.currentPage - buffer); i <= Math.min(this.totalPages, this.currentPage + buffer); i++) {
        visiblePages.push(i);
      }

      return visiblePages;
    },
    setDefaultAvatar(user) {
      if (!user.avatar) {
        user.avatar = this.defaultAvatar;
      }
    }
  },
  created() {
    this.users.forEach(this.setDefaultAvatar);
  },
  watch: {
    'users.length': function() {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    },
    'search': function() {
      this.currentPage = 1;
    }
  }
};
</script>