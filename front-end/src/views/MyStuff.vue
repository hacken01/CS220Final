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
          <div class="upload" v-if="addItem">
            <h2>{{addItem.title}}</h2>
            <img :src="addItem.path" />
            <p>{{addItem.text}}</p>
          </div>
        </div>
        <!--
        <div class="heading">
          <div class="circle"></div>
          <h2>Edit/Delete an Item</h2>
        </div>
        <div class="edit">
          <div class="form">
            <input v-model="findTitle" placeholder="Search">
            <div class="suggestions" v-if="suggestions.length > 0">
              <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
              </div>
            </div>
          </div>
          <div class="upload" v-if="findItem">
            <input v-model="findItem.title">
            <p></p>
            <img :src="findItem.path" />
            <br />
            <textarea v-model="findItem.text" cols=50 rows=4 placeholder="Description" ></textarea>
          </div>
          <div class="actions" v-if="findItem">
            <button @click="deleteItem(findItem)">Delete</button>
            <button @click="editItem(findItem)">Edit</button>
          </div>
        </div>-->
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
      addItem: null,
      posts: [],
      findUsername: "",
      findItem: null,
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
          path: r1.data.path,
          text: this.personComment,
        });
        this.addItem = r2.data;
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
        this.getItems();
        return true;
      } catch (error) {
         console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/posts/" + post._id, {
          name: this.findPost.name,
          text: this.findPost.text,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
         console.log(error);
      }
    },
  }
}
</script>

<style>
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
  max-width: 50%;

}

input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
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
  margin-right: 50px;
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
  background-color: #5BDEFF;
  color: #fff;
} 
</style>