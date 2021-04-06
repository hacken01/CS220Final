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
  <div class="wrapper">
    <div class="users">

      <div class="user" v-for="post in posts" :key="post.id">
        <div class="info">
        <h2>{{post.name}}</h2>
        <h2>{{post.username}}</h2> 
        </div>
        
        <div class="image">
        <img :src="post.path" />
        </div>
        <p>{{post.personComment}}</p>
        <!--<div class="commentList">-->
        <input   class="commentBox" type="text" v-model="otherComment">
        <button @click="addComment(post)" type="submit" value="Comment">Add Comment</button>
        
          <h3>Comments:</h3>
        <ul>
          <li v-for="comment in comments[post._id] " :key="comment.id">
              {{comment.otherComment}}
          </li>
        </ul>
        
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
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
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        for(let post of this.posts){
          const response = await axios.get(`/api/posts/${post._id}/comments`);
          this.comments[post._id] = response.data;
          //Vue.set(this.comments,post._id,response.data); 
           console.log(this.comments[post._id]);
        }
       
        console.log("comments loaded");
      } catch (error) {
        console.log(error);
      }
    },
    async addComment(post) {
      console.log("comment Added");
      try {
        await axios.post(`/api/posts/${post._id}/comments`, {
          username: this.username,
          otherComment: this.otherComment,
        });
        this.username = "";
        this.otherComment = "";
        this.getComments();
      } catch (error) {
        console.log(error);
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