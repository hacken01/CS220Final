<template>
<div class="post">
  <div class="PostBox">
    <div class="login"  v-bind="post">
        <h2>Logged in as: {{user.firstName}} {{user.lastName}}</h2>
    </div>
    <div class="image" id="imageBlock" v-bind="post">
        <img :src="post.path" /> 
        <h3 class="title">{{post.title}}</h3>
        <h2 class="title">{{post.description}}</h2>
        <h2 class="title">By: {{post.user.username}}</h2>
        <p class="postDate">{{formatDate(post.created)}}</p>
    </div>
    <div class="commentForm">
        <div>
            <button @click="setCreating" class="pure-button button-xsmall">
                <legend>Leave a Comment:</legend>
            </button>
            </div>
            <form class="pure-form" v-if="creating" @submit.prevent="addComment">
            
            <fieldset>
                <textarea v-model="comment"></textarea>
                <br />
                <button @click="cancelCreating" class="pure-button space-right">Cancel</button>
                <button class="pure-button pure-button-primary" type="submit">Submit</button>
            </fieldset>
            </form>
        </div>

        <div class="comments" v-for="comment in comments" v-bind:key="comment.id">
            <div class="comment">
                <div class="comment">
                <h3>Time: {{time(comment.created)}}</h3>
                <p>{{comment.comment}}</p>
                </div>
            </div>
        </div>
    
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
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
        if(this.$route.params.id != null){
        let response = await axios.get("/api/posts/"+this.$route.params.id);
        this.post = response.data;
        }
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

.post {
  background: white;
}

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

#imageBlock {
  display: inline-block;
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