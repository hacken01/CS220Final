<template>
<div>
  <section class="image-gallery">
    <div class="image" v-for="post in posts" v-bind:key="post._id">
      <router-link :to="{ name: 'post', params: { id: post._id}}"><img :src="post.path" /></router-link>
      <div class="postInfo">
        <p class="postTitle">{{post.title}}</p>
        <p class="postName">{{post.user.firstName}} {{post.user.lastName}}</p>
      </div>
      <p class="postDate">{{formatDate(post.created)}}</p>
      <div class="comments">
            <CommentForm v-if="user" />
            <Login v-else />
        </div>
    </div>

    

  </section>
</div>
</template>

<script>
//import axios from 'axios';
import moment from 'moment';
import CommentForm from '@/components/CommentForm.vue';
import Login from '@/components/Login.vue';
export default {
  name: 'ImageGallery',
  components: {
    CommentForm,
    Login,
  },
  props: {
    posts: Array
  },
  data() {
    return {
      creating: false,
      error: '',
      post: {
          user: {
              username: ''
          }
      },
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
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  },}
</script>

<style scoped>
.postInfo {
  display: inline-block;
  justify-content: space-between;
  font-size: 0.8em;
  color: #3c3c42;
}

.postInfo p {
  margin: 0px;
  padding: 5px;
  color: #3c3c42;
}

.postDate {
  font-size: 0.7em;
  font-weight: normal;
  padding: 5px;
  color: #3c3c42;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1em;
  margin-left:2%;
  margin-right:2%;
  justify-content: center;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  border-radius: 5px;
  background-color: white;
  padding: 5px;
  border: 5px solid white;

}

.image img {
  width: 100%;
  border-radius: 5px;
}

.image:hover{
  border: 5px solid #42b983;
  border-radius: 5px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>