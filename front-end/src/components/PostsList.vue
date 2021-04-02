<template>
<div class="wrapper">
  <div class="users">
    
    <div class="user" v-for="user in users" :key="user.id">
      <div class="image">
        <img :src="user.Image"> <!--FIX IMAGES?-->
      </div>
      <div class="info">
        
        <h1>{{user.description}}</h1>
        <p>@{{user.username}}</p>
        <p>Topic: {{user.Topic}}</p>
      </div>
      
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'UserList',
  props: {
    users: Array
  },
  methods: {
      removefromMyPosts(newUser) {
          this.$root.$data.removefromMyPosts(newUser);
          this.$root.$data.decreaseMyPostsNum();
          console.log(this.$root.$data.following);
      }
  }
}
</script>

<style scoped>
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
  height: 200px;
  width: 65%;

}

.user {
  margin: 10px;
  margin-top: 40px;
  width: 300px;
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


.price {
  display: center;
  padding-bottom: 5px;
}

button {
  height: 50px;
  
  background: #000;
  color: white;
  border: none;
  border-radius: 10px;
  margin-top: 5px;
  
  
}

button:hover{
  background-color: grey;
}

.auto {
  margin-left: auto;
}
</style>