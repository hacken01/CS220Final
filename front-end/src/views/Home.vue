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
  <div class="browseTitle">
  <h4 class="titleBox">Examples:<h4>Superhero, Technology, Video Games, Science, Dino, Other</h4></h4>
  </div>
    
  <!--<UserList :users="users" />-->
  <section class="image-gallery">
    <div class="image" v-for="post in posts" :key="post.id">
      <h2>{{post.name}}</h2>
      <h2>{{post.username}}</h2>
      <img :src="post.path" />
      <p>{{post.personComment}}</p>
    </div>
  </section>


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
    }
  },
   created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        return true;
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

}

.titleBox{
  
  border-radius: 5px;
  background-color: #42b983;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 5px;
  margin-bottom: 0px;
  max-width: 50%;

}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  padding-right: 10px;
  width: 1px;
  background-color: white;
}

input {
  display: table-cell;
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
  display: inline-block;
  width: 100%;
}
.image img {
  width: 100%;
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
