<template>
<div class="home">
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
    ImageGallery,
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
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts/all");
        this.posts = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
.home {
  padding-top: 20px;
}

</style>
