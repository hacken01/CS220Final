<template>

<div>
  <div class="wrapper">
    <!--<div class="search">
      <form class="pure-form">
        <i>Search:</i><input placeholder="Topic" v-model="searchText" />
      </form>
    </div>-->
  </div>
  <div class="browseTitle">
  <h1 class="titleBox">Browse:</h1>
  </div>
  <!--<div class="browseTitle">
  <h4 class="titleBox">Examples:<h4>Superhero, Technology, Video Games, Science, Dino, Other</h4></h4>
  </div>-->
    
  <!--<UserList :users="users" />-->
  <div class="wrapper" id="ActionItems">
    <div class="users">
      <div class="user" v-for="post in posts" :key="post.id">
        <div class="info">
        <h3 class="name">{{post.name}}</h3>
        <h3>{{post.username}}</h3> 
        </div>
        <div class="image">
        <img :src="post.path" />
        </div>
        <p>{{post.personComment}}</p>
        <!--<div class="commentList">-->
        <input class="commentBoxArea" type="text" placeholder="Comment Here..." v-model="otherComment" >
        <button @click="addComment(post)" type="submit" value="Comment">Add Comment</button>
          <h3>Comments:</h3>
        <div class="listItems">
          <div v-for="comment in comments[post._id] " :key="comment.id">
              {{comment.otherComment}}
          <button @click="deleteComment(post._id,comment._id)" type="submit" value="R"><i class="fa fa-trash" aria-hidden="true"></i></button>
          <button @click="editComment(post._id,comment._id)" type="submit" value="E"><i class="fa fa-paint-brush" aria-hidden="true"></i></button>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
//import UserList from "../components/UserList.vue"
export default {
  name: 'Home',
  /*components: {
    UserList
  },*/
  data() {
    return {
      posts: [],
      post: null,
      username:'john',
      otherComment:'',
      comments : {},
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
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async getComments() {
      try {
        for(let post of this.posts){
          const response = await axios.get(`/api/posts/${post._id}/comments`);
          // use vue.set to make it reactive 
          Vue.set(this.comments,post._id,response.data); 
        }
      } catch (error) {
        //console.log(error);
      }
    },
    async addComment(post) {
      try {
        await axios.post(`/api/posts/${post._id}/comments`, {
          username: this.username,
          otherComment: this.otherComment,
        });
        this.username = "";
        this.otherComment = "";
        this.getComments();
      } catch (error) {
        //console.log(error);
      }
    },
    async editComment(postId,commentId){
        //console.log("comment Edited ");
      try {
        axios.put(`/api/posts/${postId}/comments/${commentId}`, {
          otherComment: this.otherComment,
        });
        this.getComments();
      } catch (error) {
        //console.log(error);
      }
    },
    async deleteComment(postId, commentId) {
        //console.log("comment Deleted");
      try {
        await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
        this.getComments();
      } catch (error) {
        //console.log(error);
      }
    },
  }
  /*computed: {
    users() {
      return this.$root.$data.users.filter((user => user.topic.toLowerCase().search(this.searchText.toLowerCase()) >= 0));
    }
  },*/
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  flex-wrap: wrap;
 
}
.name{
  font-size: 25px;
}

.browseTitle{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #3c3c42;
}
.titleBox{
  
  border-radius: 5px;
  background-color: #42b983;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 5px;
  margin-bottom: 0px;
  max-width: 50%;
  color: #3c3c42;
}
.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}
form {
  
  width: 100%;
}
i {
  padding-left: 10px;
  padding-right: 10px;
  width: 1px;
  background-color: white;
}
input {
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
.image h2 {
  font-style: italic;
}

button {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.2em;
  border-radius: 5px;
  background-color: lightgray;
  padding: 3px;
  margin-right: 3px;
  margin-left: 3px;
}

button:hover{
  background-color: darkgrey;
}

.listItems{
 text-align: right;
 overflow: auto;
 max-height: 200px;
 min-height: 200px;
 border-radius: 5px;
 border: 2px solid #42b983;
 margin-bottom: 10px;
 padding-right: 20px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}
.image-gallery {
  column-gap: 1.5em;
}
.image {
  margin: 0 0 1.5em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}
.image img {
  width: 100%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.users {
  margin-top: 20px;
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-y:auto;
  height: 400px;
  width: 65%;
}
.user {
  margin: 10px;
  margin-top: 40px;
  width: 400px;
  background-color: white;
  border: 15px solid #42b983;
  border-radius: 5px;
  padding-left: 15px;
  padding-right: 15px;
}
.user:hover{
  border-color: grey;
}
.user img {
  
  height: 350px;
  width: 250px;
  object-fit: cover;
  padding-top: 15px;
}
.user .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.info {
  background-color: white;
  color: #000;
  padding: 10px;
  height: 80px;
  margin-bottom: 20px;
}
.info h1 {
  font-size: 16px;
}
.info h2 {
  font-size: 14px;
}
.info p {
  margin: 0px;
  font-size: 10px;
}
.commentBox{
  height: 50px;
  width: 100%;
  margin-bottom: 0px;
}

.commentList {
  border: 2px solid black;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: left;
  padding-left: 5px;
}
/* Masonry on small screens */
@media only screen and (max-width: 650px){
  .user{
    margin: 10px;
    margin-top: 40px;
    width: 200px;
    background-color: white;
    border: 15px solid #42b983;
    border-radius: 5px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .image{
    width: fit-content;
    padding: 0px;
  }
  .user img[data-v-fae5bece] {
    height: 125px;
    width: 150px;
    -o-object-fit: cover;
    object-fit: cover;
    padding-top: 15px;
    margin: 0px;
}
}
</style>