<template>
<div class="dashboard">
  <MyPosts v-if="user" />
  <Login v-else />
</div>
</template>

<script>
import MyPosts from '@/components/MyPosts.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'dashboard',
  components: {
    MyPosts,
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding-top: 10px;
}
</style>