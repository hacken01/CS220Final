<template>
<div class="hero">
  <div class="heroBox">
    <form class="pure-form">
      
      <fieldset>
        <legend>Register for an account</legend>
        <div class="input">
        <input placeholder="first name" v-model="firstName">
        <input placeholder="last name" v-model="lastName">
        </div>
      </fieldset>
      <fieldset>
        <div class="input">
        <input placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
        </div>
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
      </fieldset>
    
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form space-above">
      <fieldset>
        <legend>Login</legend>
        <div class="input">
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
        </div>
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
      </fieldset>
      
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomePage',
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
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
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

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 0px;
  margin-bottom: 20px;
  display: inline-block;
  justify-content: center;
}

.heroBox {
  text-align: center;
}

.hero form {
  font-size: 14px;
  background: #3c3c42;
  border-radius: 5px;
  padding-top: 25px;
  border: 5px solid white;
  
}

.hero form:hover{
  border: 5px solid #42b983;
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

button {
  background: white;
  color: #3c3c42;
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