<template>
<div>
  <section class="page-gallery">
    <div class="image" v-for="post in posts" v-bind:key="post._id">
      <router-link :to="{ name: 'post', params: { id: post._id}}"><img :src="post.path" /></router-link>
      <div class="postInfo">
        <p class="postTitle">{{post.title}}</p>
        <p class="postName">{{post.user.firstName}} {{post.user.lastName}}</p>
      </div>
      <p class="postDate">{{formatDate(post.created)}}</p>

      <div class="commentForm">
        <div>
          <button @click="setCreating" class="pure-button button-xsmall">
            <legend>Leave a Comment:</legend>
          </button>
        </div>

        <form class="pure-form" v-if="creating" @submit.prevent="addComment">
      
        <fieldset>
            <textarea class="commentArea" v-model="comment"></textarea>
            <br />
            <button @click="cancelCreating" class="pure-button space-right">Cancel</button>
            <button @click="addComment(post)" class="pure-button pure-button-primary" type="submit">Submit</button>
        </fieldset>
        </form>
        
        <div class="commentList">
          <div class="comment" v-for="comment in comments[post._id] " :key="comment.id">
            <p>{{comment.comment}} -- Posted {{formatDate(comment.created)}} by {{post.user.username}}</p>
            <button @click="deleteComment(post._id,comment._id)" type="submit" value="R"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <button @click="editComment(post._id,comment._id)" type="submit" value="E"><i class="fa fa-paint-brush" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
  
    </div>
  </section>
</div>
</template>

<script>
//import axios from 'axios';
import axios from 'axios';
import moment from 'moment';
import Vue from 'vue';
export default {
  name: 'PageGallery',
  components: {
  },
  props: {
  },
  data() {
    return {
      creating: true,
      error: '',
      posts: {},
      post: {
          user: {
              username: ''
          }
      },
      comments: {},
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
    }
  },
  created() {
    this.getPosts();
    this.getComments();
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        this.getComments();
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
        //console.log(this.post);
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
        for(let post of this.posts){
          const response = await axios.get(`/api/comments/` + post._id);
          // use vue.set to make it reactive 
          Vue.set(this.comments,post._id,response.data); 
          console.log(response.data);
        }
      } catch (error) {
        //console.log(error);
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
    async addComment(post) {
      try {
        console.log(post)
         if(post._id){
        await axios.post(`/api/comments/` + post._id, {
          comment: this.comment,
        });
        this.getComments();
         }
         this.comment = '';
      } catch (error) {
        //console.log(error);
      }
    },
    async editComment(postId,commentId){
  
      try {

        if(commentId){
          axios.put(`/api/comments/${postId}/comments/${commentId}` , {
          comment: this.comment,
        });
        this.getComments();
        }
        this.comment = '';
      } catch (error) {
        //console.log(error);
      }
    },
    async deleteComment(postId, commentId) {
        console.log("comment Deleted");
      try {
        await axios.delete(`/api/comments/${postId}/comments/${commentId}`);
        this.getComments();
      } catch (error) {
        //console.log(error);
      }
    },
  }
}
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

.commentArea {
  margin-bottom: 5px;
}

.commentList {
  overflow: auto;
  max-height: 150px;
  background-color: rgb(231, 230, 230);
  padding: 5px;
  border-radius: 3px;
  margin-top: 5px;
}

.commentList::-webkit-scrollbar {
    width: 15px;
    height: auto;
}

.commentList::-webkit-scrollbar-track {
    background-color:lightgrey;
    border-radius: 5px;
}

.commentList::-webkit-scrollbar-thumb {
  background-color: #42b983;
  border-radius: 5px;
}

.pure-button-primary, .pure-button-selected, a.pure-button-primary, a.pure-button-selected {
  background-color: #42b983;
}

.comment {
  margin-top: 5px;
  margin-bottom: 5px;
}

button {
  margin-left: 5px;
  margin-right: 5px;
}

.commentList button {
  padding-left: 5px;
  padding-right: 30px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.page-gallery {
  column-gap: 1em;
  margin-left:2%;
  margin-right:1.5%;
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
@media only screen and (min-width: 1025px) {
  .page-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .page-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .page-gallery {
    column-count: 2;
  }
}
</style>