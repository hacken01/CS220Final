<template>
<div class="hero">
  <div class="welcome">
  <h1>Welcome!</h1>
  <h3>To get started please Sign-In or Register</h3>
  </div>
  <div class="heroBox">
    <button @click="setRegister" class="pure-button button-xsmall">
        <legend>Register:</legend>
    </button>

    <button @click="setExisting" class="pure-button button-xsmall">
        <legend>Login:</legend>
    </button>

    <Register v-if="register === true" />
    <ExistingUser v-if="existing === true" />
    
  </div>
</div>
</template>

<script>
import Register from '@/components/Register.vue';
import ExistingUser from '@/components/ExistingUser.vue';
export default {
  name: 'Login',
  components: {
    Register,
    ExistingUser,
  },
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
  methods: {
    setRegister() {
      this.register = true;
      this.existing = false;
    },
    setExisting() {
      this.register = false;
      this.existing = true;
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
  margin-left: 5px;
  margin-right: 5px;
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