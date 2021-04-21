<template>
<div class="home">
  <LobbySignedIn v-if="user" />
  <Login v-else />
</div>
</template>

<script>
import axios from 'axios';
import LobbySignedIn from '@/components/LobbySignedIn.vue';
import Login from '@/components/Login.vue';
export default {
  name: 'Home',
  components: {
    LobbySignedIn,
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
.home {
  padding-top: 20px;
}
</style>
