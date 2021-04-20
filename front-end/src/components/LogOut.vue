<template>
<div class="hero">
  <div class="welcome">
  <h1>Already Signed In! :D</h1>
  <h3>We hope you are enjoying your experience!</h3>
  </div>
  <div class="heroBox">
    <button type="button" @click="logout">Log Out<i class="fas fa-sign-out-alt"></i></button>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
      register: false,
      existing: false,
    }
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
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.space-above {
  margin-top: 50px;
}

.welcome {
  background-color: #42b983;
  padding: 15px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 5px;
  margin-bottom: 15px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
  color: white;
}

.hero {
  padding: 0px;
  margin-bottom: 20px;
  display: inline-block;
  justify-content: center;
}

.heroBox {
  text-align: center;
  color: white;
}

.hero form legend {
  font-size: 20px;
  border-radius: 5px;
   background: white;
   max-width: 80%;
}

.input{
  background: lightgray;
  max-width: 80%;
  padding: 1px;
  border-radius: 5px;
  margin: auto;
}

input {
  margin-right: 10px;
  margin-bottom: 1px;
  text-align: center;
}

h3 {
  color: white;
}

button {
  background: white;
  color: #3c3c42;
  border-radius: 20px;
  padding-left: 15px;
  padding-right: 25px;

}

button:hover {
  background: #42b983;
  color: black;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #42b983;
  color: #fff;
}
</style>