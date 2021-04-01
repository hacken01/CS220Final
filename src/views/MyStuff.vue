<template>
  <div class="MyStuff">
    <div class="Following">
      <div class="titleBox" id="1">
        <h1> My Posts </h1>
        <h3>Number of Comments: {{this.$root.$data.numFollowingPosts}}</h3>
        <h1>Create Comment</h1>
        <form v-if="creating" @submit.prevent="addComment">
          <input v-model="firstname" placeholder="First Name">
          <input v-model="lastname" placeholder="Last Name">
          <p></p>
          <textarea v-model="comment" placeholder="Comment..."></textarea>
          <br />
          <button type="submit">Submit</button>
        </form>
        <div v-else>
          <p>Awesome Comment!!!</p>
          <p><a @click="toggleForm" href="#">Leave another comment</a></p>
        </div>
      </div>
    </div>

    <div class="Following">
      <div class="titleBox" id="2">
        <h1> Liked Posts </h1>
        <h3>Number of Likes: {{this.$root.$data.numUserPosts}}</h3>
      </div>
    </div>  
    <LikedList :users="posts" />

    <div class="Following" id="CommentBox">
      <div class="titleBox">
        <h1>Current Comments</h1>
        <div v-for="comment in comments" v-bind:key="comment.id">
          <div class="comment">
            <div class="problem">
              <div class="currComment">
                <p>{{comment.comment}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LikedList from "../components/LikedList.vue"
export default {
  name: 'User',
  components: {
    LikedList,
  },
  data() {
    return {
      numMyPosts: this.$root.$data.numUserPosts,
      numLikedPosts: this.$root.$data.numFollowingPosts,
      creating: true,
      firstname: '',
      lastname: '',
      comment: '',
    }

  },
  computed: {
    posts() {
      return this.$root.$data.posts;
    },
    following() {
      return this.$root.$data.following;
    },
    comments() {
      return this.$root.$data.getComments();
    },
    
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    addComment() {
      this.$root.$data.addComment(this.firstname, this.lastname, this.comment);
      this.firstname = "",
      this.lastname= "",
      this.comment= "",
      this.creating = true;
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
</style>