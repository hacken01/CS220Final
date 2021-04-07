<template>
  <div class="MyStuff">
    <div class="Following">
      <div class="titleBox" id="1">
        <h1> My Posts </h1>
      </div>      
    </div>

    <div class="actionItems" >
      
    <!--Add-->
        <div class="ActionBox">      
          <div class="heading">
          <h2>Add a Post</h2>
          </div>
          <div class="add">
            <div class="form">
              <input v-model="name" placeholder="Name">
              <p></p>
              <input v-model="username" placeholder="Username">
              <p></p>
              <input type="file" name="photo" @change="fileChanged">
              <br />
              <textarea v-model="personComment" cols=50 rows=4 placeholder="Comment" ></textarea>
              <button @click="upload">Upload</button>
            </div>
            <div>
              
            <!--<div class="upload" v-if="addPost">
              <h2>{{addPost.name}}</h2>
              <h2>{{addPost.username}}</h2>
              <p>{{addPost.personComment}}</p>
              <img :src="addPost.path" />
            </div>-->
            </div>
            
          </div>
              <!--
              <div class="ActionBox">      
                <div class="heading">
                <h2>Settings</h2>
                </div>
                <div class="add">
                  <div>
                  <h3>This is where you're login info will be</h3>
                  </div>
                </div>
              </div>-->
        
        </div>

        <div class="selectEdit"> 
        <!--Edit/Delete--> 
        <div class="ActionBox"> 
          <div class="heading">
            <h2>Select Post</h2>
          </div>
          <div class="edit">
            <div class="form">
              <input v-model="findUsername" placeholder="Search">
              <div class="suggestions" v-if="suggestions.length > 0">
                <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectPost(s)">{{s.username}}
                </div>
              </div>
            </div>
          </div>
        </div>
        

        <!--Edit/Delete--> 
        <div class="ActionBox"> 
          <div class="heading">
            <h2>Edit/Delete a Post</h2>
          </div>
          <div class="editBody">
            <div class="upload" v-if="findPost">
              <input v-model="findPost.username">
              <p></p>
              <div class="selectedImage">
              <img :src="findPost.path" />
              </div>
              <br />
              <textarea v-model="findPost.personComment" cols=50 rows=4 placeholder="Comment" ></textarea>
            </div>
            <div class="actions" v-if="findPost">
              <button @click="deletePost(findPost)">Delete</button>
              <button @click="editIPost(findPost)">Edit</button>
            </div>
          </div>
          </div>
        </div>
    </div>

    <!--Posts--> 
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
        <input class="commentBox" type="text" v-model="otherComment" >
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
import axios from 'axios'; // to use the back end API
import Vue from 'vue';
export default {
  name: 'User',
  
  data() {
    return {
      name: "",
      username: "",
      file: null,
      personComment: "",
      addPost: null,
      posts: [],
      findUsername: "",
      findPost: null,
      numPosts: 0,
      post: null,
      otherComment:'',
      comments : {},
    }
  },
  computed: {
/*     posts() {
      return this.$root.$data.posts;
    },
    following() {
      return this.$root.$data.following;
    },
     */
    suggestions() {
      let posts = this.posts.filter(post => post.username.toLowerCase().startsWith(this.findUsername.toLowerCase()));
      return posts.sort((a, b) => a.username > b.username);
    }
  },
  created() {
    this.getPosts();
    this.getComments();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/posts', {
          name: this.name,
          username: this.username,
          personComment: this.personComment,
          path: r1.data.path,
        });
        this.addPost = r2.data;
        this.name = "";
        this.username = "";
        this.personComment = "";
        this.file = null;
        this.getPosts();
      } catch (error) {
         console.log(error);
      }
    },
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        Vue.set(this.posts, response.data);
        this.posts = response.data;
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectPost(post) {
      this.findUsername = "";
      this.findPost = post;
    },
    async getComments() {
      try {
        for(let post of this.posts){
          const response = await axios.get(`/api/posts/${post._id}/comments`);
          // use vue.set to make it reactive 
          Vue.set(this.comments,post._id,response.data); 
        }
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
    },
    async deleteItem(post) {
      try {
        await axios.delete("/api/posts/" + post._id);
        this.findPost = null;
        this.getPosts();
        return true;
      } catch (error) {
         console.log(error);
      }
    },
    async editItem(post) {
      console.log("Post Edited");
      try {
        axios.put("/api/posts/" + post._id, {
          username: this.findPost.username,
          personComment: this.findPost.personComment,
        });
        this.findPost = null;
        this.getPosts();
        return true;
      } catch (error) {
         console.log(error);
      }
    },
    async editComment(postId,commentId){
        console.log("comment Edited ");
      try {
        axios.put(`/api/posts/${postId}/comments/${commentId}`, {
          otherComment: this.otherComment,
        });
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(postId, commentId) {
        console.log("comment Deleted");
      try {
        await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
        this.getComments();
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style>
/*GENERAL CSS*/
body{
  background: #3c3c42;
}

.AddPost{
  background-color: white;
}

.Following{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.titleBox{
  border-radius: 5px;
  background-color: #3c3c42;
  padding-left: 10%;
  padding-right: 10%;
  width: 40%;
  margin-bottom: 20px;
}

.actionItems{
  height: fit-content;
  width: fit-content;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
}

.selectEdit{
  display: flex;
  flex-direction: column;
}

.ActionBox{
  background: #42b983;
  align-content: flex-start;
  margin: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  flex-wrap: wrap;
  justify-content: center;
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

.listItems::-webkit-scrollbar {
    width: 1em;
    height: auto;
}

.listItems::-webkit-scrollbar-track {
    background-color:lightgrey;
}

.listItems::-webkit-scrollbar-thumb {
  background-color: #42b983;
  border-radius: 5px;
}

input {
  font-size: 1.2em;
  height: 30px;
  width: 250px;
  border-radius: 5px;
  margin-right: 5px;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 600px;
  min-width: 200px;
  max-height: 100px;
  min-height: fit-content;
  border-radius: 5px;
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

.selectedImage{
  overflow: auto;
  max-height: 200px;
}

#CommentBox {
  margin-top: 20px;
  margin-bottom: 20px;
}

.currComment{
  background: white;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}
.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 14px;
  justify-content: center;
  
}
.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
  font-size: 20px;
}
.add,
.edit {
  display: flex;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  text-align: center;
}

.add{
  justify-content: center;
  text-align: center;
}

.selectedImage::-webkit-scrollbar {
    width: 15px;
    height: auto;
}

.selectedImage::-webkit-scrollbar-track {
    background-color:lightgrey;
    border-radius: 5px;
}

.selectedImage::-webkit-scrollbar-thumb {
  background-color: darkgray;
  border-radius: 5px;
}

h1{
  color: #42b983;
  text-align: center;
}
/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  resize: none;
}
.form {
  margin-right: 0px;
  
}
/* Uploaded images */
.upload h2 {
  margin: 0px;
}
.upload img {
  max-width: 300px;
}

h2{
  font-size: 14px;
}
/* Suggestions */
.suggestions {
  border: 1px solid #ccc;
  background-color: white;
  text-align: center;
}
.suggestion {
  min-height: 20px;
}
.suggestion:hover {
  background-color: #3c3c42;
  color: #fff;
}

.wrapper {
  display: flex-box;
  align-items: center;
  justify-content: center;
  width: auto;
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

.users::-webkit-scrollbar {
    width: 15px;
    height: auto;
}

.users::-webkit-scrollbar-track {
    background-color:lightgrey;
    border-radius: 5px;
}

.users::-webkit-scrollbar-thumb {
  background-color: #42b983;
  border-radius: 5px;
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
  height: 100px;
  margin-bottom: 30px;
}
/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  
}
/* Masonry on medium-sized screens */
@media only screen and (max-width: 865px) and (min-width: 665px) {
  
}
/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  
}
</style>