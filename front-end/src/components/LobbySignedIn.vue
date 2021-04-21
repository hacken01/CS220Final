<template>
<div class="main">
  <div class="home">
    <h3>Signed in as: {{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h3>
  </div>
  <image-gallery :posts="posts" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import ImageGallery from '@/components/ImageGallery.vue';
export default {
  name: 'Home',
  components: {
    ImageGallery
  },
  data() {
    return {
      posts: [],
      error: '',
    }
  },
  created() {
    this.getPosts();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
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
    async getPosts() {
      try {
        this.response = await axios.get("/api/posts/all");
        this.posts = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
.menu {
  display: inline-block;
  justify-content: space-between;
  color: white;
  margin-left: 2.5%;
  margin-right: 5%;
}

.menu h2 {
  font-size: 14px;
  
}

.uploadBox {
  background-color: white;
  padding: 5px;
  padding-left: 10px;
  padding-right: 25px;
  color: #3c3c42;
  border-radius: 5px;
}

.uploadImg:hover{
  color: #42b983;
  
}

.home {
    color: white;
    text-align: left;
    margin-left: 2%;
}
</style>