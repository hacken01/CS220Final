<template>
<div class="post">
    <div class="menu">
        <Menu v-if="user" />
        <!--<h2>Logged in as: {{user.firstName}} {{user.lastName}}</h2>-->
    </div>
    
    <div class="image" v-bind="post">
      <div class="imageBlock">
        <img :src="post.path" /> 
        <h3 class="title">{{post.title}}</h3>
        <h2 class="title">{{post.description}}</h2>
        <h2 class="title">By: {{post.user.username}}</h2>
        <p class="postDate">{{formatDate(post.created)}}</p>
        </div>
    </div>
    <div class="commentForm">

        <div class="comments">
            <CommentForm v-if="user" />
            <Login v-else />
        </div>
    
    </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import CommentForm from '@/components/CommentForm.vue';
import Login from '@/components/Login.vue';
import Menu from '@/components/Menu.vue';
export default {
  name: 'Post',
  components: {
    CommentForm,
    Login,
    Menu,
  },
  data() {
    return {
      creating: false,
      posts: [],
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
  created() {
    this.getPost();
    this.getComments();
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
    async getPost() {
      try {
        let response = await axios.get("/api/posts/"+this.$route.params.id);
        this.post = response.data;
        console.log(this.post);
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async logout() {
        try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
        } catch (error) {
        this.$root.$data.user = null;
        }
    },
    async getComments() {
      try {
        let response = await axios.get("/api/comments");
        this.comments = response.data.comments;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
    setCreating() {
    this.creating = true;
    },
    cancelCreating() {
        this.creating = false;
    },
    async addComment() {
      try {
        await axios.post("/api/comments", {
          comment: this.comment
        });
        this.comment = "";
        this.creating = false;
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
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
  margin-left: 25px;
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
  color: gray;
}

textarea {
  width: 100%;
  max-width: 500px;
  margin-bottom: 5px;
}

.image {
  display: inline-block;
  width: 50%;

}

.imageBlock {
  background-color: white;
  border-radius: 5px;
  padding-bottom: 5px;
}

.commentForm {
  margin-top: 5px;
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
}

button {
  background-color: #42b983;
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