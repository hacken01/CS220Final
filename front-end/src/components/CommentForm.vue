<template>
<div class="post">
    <div class="commentForm">
      <div>
      <button @click="setCreating" class="pure-button button-xsmall">
          <legend>Leave a Comment:</legend>
      </button>
      </div>

      <form class="pure-form" v-if="creating" @submit.prevent="addComment">
      
      <fieldset>
          <textarea v-model="comment"></textarea><!--ISSUE WITH COMMENT Method??-->
          <br />
          <button @click="cancelCreating" class="pure-button space-right">Cancel</button>
          <button class="pure-button pure-button-primary" type="submit">Submit</button>
      </fieldset>
      </form>
    </div>

    <div class="comments" v-for="comment in comments" v-bind:key="comment.id">
        <div class="commentInfo">
            <div class="comment">
              <p>{{comment.comment}} -- Posted {{formatDate(comment.created)}} by {{comment.user.username}}</p> <!--UNABLE TO CALL .user.username-->
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
      post: {
          user: {
              username: ''
          }
      },
      comments: [],
      comment: '',
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
    },
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
        let response = await axios.get("/api/comments/"+this.$route.params.id); //DO I NEED TO FILTER BY PHOTO HERE?
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
        await axios.post("/api/comments/"+this.$route.params.id, {
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
  display: inline-block;
  
  justify-content: right;
  color: black;
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

.image {
  display: inline-block;
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