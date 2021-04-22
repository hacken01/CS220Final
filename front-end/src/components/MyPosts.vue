<template>
<div class="main">
  <div class="menu">
    <div class="uploadBox">
      <div class="uploadImg"><a @click="toggleUpload">Upload Image<i class="fas fa-image"></i></a></div>
    </div>
    <h2>{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <page-gallery :posts="posts" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import PageGallery from '@/components/PageGallery.vue';
//import Vue from 'vue';
export default {
  name: 'MyPosts',
  components: {
    Uploader,
    PageGallery
  },
  data() {
    return {
      show: false,
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
        this.response = await axios.get("/api/posts");
        //Vue.set(this.posts, this.response.data);
        this.posts = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
      this.getPosts();
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getPosts();
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
</style>