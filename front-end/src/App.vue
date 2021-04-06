<template>
  <div id="app">
  <font-awesome-icon icon="spinner" />
  <div id="menu">
    <div id="leftSide">
      <router-link to="/">
        <h1>Twitcherest</h1>
      </router-link>
    </div>    
    <div id="middle">
    
    </div>
    <div id="rightSide">
        <router-link to="/">Lobby</router-link>
        <router-link to="/MyStuff">My Stuff</router-link>
        <router-link to="/SignUp">Sign Up</router-link>
        <router-link to="/about">About</router-link>
    </div>
  </div>
  <router-view /> <!--REPLACE WITH THE VIEW WE SELECT-->
  <div class="footer">
    &copy; Twitcherest. | <a href="https://github.com/cjtracy16/CP4">My github</a>
  </div>
</div>
</template>

<style>

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: black;
  margin: -10px;
}

#rightSide {
  padding: auto;
  text-align: right;
  width: auto;
}

#rightSide a:hover{
  color: white;
}

#rightSide a.router-link-exact-active {
  color: white;
}

.container-fluid {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    font-size: larger;
    background-color: #3c3c42;
}

.navbar-inverse {
    opacity: none;
    background-color: #3c3c42;
}

.nabar-collapse {
    box-shadow: none;
    background-color: #3c3c42;
}

.navbar-toggle {
    border: none;
}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
  background-color: #3c3c42;
  border: none;
  padding-top: 5px;
  padding-bottom: 5px;
}

#menu a {
  font-size: x-large;
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
}

#middle {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#middle img {
  height: 200px;
}

#rightSide {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  
}

#rightSide a{
  font-size: 25px;
  padding-right: 25px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

.users{
  margin-left: 30px;
  margin-right: 30px;
  min-height: 700px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}

.footer {
  padding: 30px;
  background-color: #eee;
  color: white;
  background-color: #3c3c42;
  font-size: larger;
}

.footer a {
  text-decoration: none;
}

.footer a:visited {
  color: #42b983;
}
</style>
