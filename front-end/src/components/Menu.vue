<template>
<div class="post">
    <div class="menu"  v-bind="post">
        <h2>Logged in as: {{user.firstName}} {{user.lastName}}</h2>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Post',
  data() {
    return {
      creating: false,
      posts: [],
      error: '',
      post: [],
      comments: [],
    }
  },
  computed: {
    user() {
        if(this.$root.$data.user != null){
            return this.$root.$data.user;
        }
        else{

            return this.$root.$data.user;
        }
    }
  },
  created() {

  },
  methods: {
    async logout() {
        try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
        } catch (error) {
        this.$root.$data.user = null;
        }
    }
  }
}
</script>

<style scoped>
.home {
  padding-top: 20px;
}

.menu {
  display: flex;
  
  justify-content: right;
  color: white;
}

.menu h2 {
  font-size: 14px;
}

.post {
  margin: 0 0 1.5em;
  display: inline-block;
  justify-content: center;
  width: 100%;
  text-align: center;
  color: black;
}

textarea {
  width: 100%;
  max-width: 500px;
  margin-bottom: 5px;
}


label {
  background-color: #000;
  color: white;
  padding: 5px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
}

.post img {
  width: 60%;
  padding-top: 10%
}

img{
    width: 200px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .post img {
    width: 60%;
    padding-top: 10%
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .post img {
    width: 80%;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .post img {
    width: 100%;
    margin-top: 30%
  }
}

</style>