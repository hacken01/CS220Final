<template>
  <div class="MyStuff">
    <div class="Following">
      <div class="titleBox" id="1">
        <h1> My Posts </h1>
        <h3>Number of Comments:</h3>
        
        <div class="heading">
        
        <h2>Add an Item</h2>
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
          <div class="upload" v-if="addPost">
            <h2>{{addPost.name}}</h2>
            <h2>{{addPost.username}}</h2>
            <p>{{addPost.personComment}}</p>
            <img :src="addPost.path" />
          </div>
        </div>
        
        <div class="heading">
          <h2>Edit/Delete a Post</h2>
        </div>
        <div class="edit">
          <div class="form">
            <input v-model="findUsername" placeholder="Search">
            <div class="suggestions" v-if="suggestions.length > 0">
              <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectPost(s)">{{s.username}}
              </div>
            </div>
          </div>
          <div class="upload" v-if="findPost">
            <input v-model="findPost.username">
            <p></p>
            <img :src="findPost.path" />
            <br />
            <textarea v-model="findPost.personComment" cols=50 rows=4 placeholder="Comment" ></textarea>
          </div>
          <div class="actions" v-if="findPost">
            <button @click="deleteItem(findPost)">Delete</button>
            <button @click="editItem(findPost)">Edit</button>
          </div>
        </div>
       </div>  
      </div>
    </div>
</template>

<script>
import axios from 'axios'; // to use the back end API
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
      } catch (error) {
         console.log(error);
      }
    },
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        return true;
      } catch (error) {
         console.log(error);
      }
    },
    selectPost(post) {
      this.findUsername = "";
      this.findPost = post;
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
      try {
        await axios.put("/api/posts/" + post._id, {
          name: this.name,
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
  }
}
</script>

<style>
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
  background-color: #42b983;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 5px;
  margin-bottom: 10px;
  max-width: 60%;

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
  max-width: 500px;
  height: 100px;
  border-radius: 5px;
}

button {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.2em;
  border-radius: 5px;
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
}
.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}
.add,
.edit {
  display: flex;
}
.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}
/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
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
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}
.suggestion {
  min-height: 20px;
}
.suggestion:hover {
  background-color: #3c3c42;
  color: #fff;
} 
</style>