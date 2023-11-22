<template>
  <div class="bg-gray-200 h-screen pt-20 px-4 md:px-10 lg:px-20 xl:px-40">
    <div class="text-4xl mb-7 font-normal ml-1 md:ml-[4.5rem]">Edit user</div>
    <div class="flex flex-col md:flex-row items-stretch justify-around px-2 md:px-8 lg:px-16">
      <!-- First Container -->
      <div class="w-full md:w-2/3 bg-white shadow-md rounded-lg overflow-hidden mx-auto my-4 md:my-0 md:mr-10">
        <div class="p-5 flex flex-col h-full">
          <div class="mb-8 mt-8 flex flex-col md:flex-row justify-around">
            <div class="w-full md:w-1/2 pr-4">
              <div class="font-medium pb-2">First Name</div>
              <input v-model="user.first_name" placeholder="First Name" class="border rounded px-2 py-1 w-full mb-1" :class="{'border-red-500': !user.first_name && showError}" />
              <div v-if="!user.first_name && showError" class="text-red-500 text-xs ml-1">First name is required</div>
            </div>
            <div class="w-full md:w-1/2 xl:pl-4 mt-4 md:mt-0">
              <div class="font-medium pb-2">Last Name</div>
              <input v-model="user.last_name" placeholder="Last Name" class="border rounded px-2 py-1 w-full mb-1" :class="{'border-red-500': !user.last_name && showError}" />
              <div v-if="!user.last_name && showError" class="text-red-500 text-xs ml-1">Last name is required</div>
            </div>
          </div>
          <div class="self-start mt-auto">
            <button @click="update" class="px-6 py-2 ml-4 bg-green-600 text-white rounded transition-colors duration-200 hover:bg-green-700 active:bg-green-800">Update Details</button>
          </div>
        </div>
      </div>
      <!-- Second Container -->
      <div class="w-full md:w-1/3 bg-white shadow-md rounded-lg overflow-hidden md:my-0 text-center flex flex-col justify-center">
        <img :src="avatar" @error="setDefaultAvatar" alt="User's avatar" class="w-32 h-32 rounded-full mx-auto my-10 object-cover" />
        <div class="mb-4">
          <input v-model="user.avatar" placeholder="Avatar URL" class="border rounded px-2 py-1 w-5/6 mx-auto" />
        </div>
        <button @click="updatePhoto" class="mb-6 px-2 py-1 border border-gray-300 text-gray-600 rounded flex items-center justify-center space-x-1 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700 active:bg-gray-300 w-5/6 mx-auto">
          <i class="fa fa-camera"></i>
          <span>Change Photo</span>
        </button>
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
      user: {},
      showError: false,
      avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
    }
  },
  methods: {
    update() {
      if (this.user.first_name && this.user.last_name) {
        let img = new Image();
        img.onload = () => {
          this.$emit('update', this.user);
          this.$router.push('/');
        };
        img.onerror = () => {
          this.user.avatar = this.avatar;
          this.$emit('update', this.user);
          this.$router.push('/');
        };
        img.src = this.user.avatar;
      } else {
        this.showError = true;
      }
    },
    updatePhoto() {
      if (this.user.avatar) {
        let img = new Image();
        img.onload = () => {
          this.avatar = this.user.avatar;
        };
        img.onerror = () => {
          this.avatar = this.user.avatar;
        };
        img.src = this.user.avatar;
      } else {
        this.setDefaultAvatar();
      }
    },
    setDefaultAvatar() {
      this.avatar = 'https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg';
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.user = vm.users.find(user => user.id === Number(to.params.id))
      vm.avatar = vm.user.avatar;
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.user = this.users.find(user => user.id === Number(to.params.id))
    this.avatar = this.user.avatar;
    next()
  }
}
</script>