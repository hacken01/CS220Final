<template>
<div class="main">
  <div class="menu">
    <p><a @click="toggleUpload"><i class="fas fa-image"></i></a></p>
    <h2>{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <image-gallery :posts="posts" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import ImageGallery from '@/components/ImageGallery.vue';
export default {
  name: 'MyPosts',
  components: {
    Uploader,
    ImageGallery
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
        this.posts = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
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
</style>