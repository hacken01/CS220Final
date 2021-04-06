<template>
  <div class="about">
 <div class="about-section">
  <h1>About Us</h1>
  <p>The Code Eaters began in 2021 with one goal in mind, provide the boys with some good entertainment.</p>
  <p>Thats what we have done.</p>
</div>

<div class="row">
  <div class="column">
    <div class="card">
      <div class="container">
        <h2>Conner Tracy</h2>
        <p class="title">Co-Founder</p>
        <p>An original hustler.</p>
        <p>cj-tracy@twitcherest.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <div class="container">
        <h2>Gabriel Arancibia</h2>
        <p class="title">Co-Founder</p>
        <p>An original hustler.</p>
        <p>gab-arancibia@twitcherest.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
   
  </div>
   <div class="free">
  <h1>It is all you need</h1>
  <p>Just when you thought it couldn't get better, we decided to make free for you.</p>
  <p>Enjoy.</p>
</div>
  </div>
</template>

<style>
  
.about {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  
}
body{
  background-color: #3c3c42;
  color: lightgray;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  
  display: inline-block;
  width: 25%;
  margin-bottom: 16px;
  padding: 0 8px;
  font-size: 1vw;
  
}

.image{
  display: flex;
  align-items: center;
}

h1{
  color: white;
}

h2{
  font-size: 2vw;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 2%;
  background-color: #fff;
  
}

.about-section {
  padding: 50px;
  text-align: center;
  color: white;
}

.container {
  padding: 16px;

}
.row{
  background-color: #fff;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: flex;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  padding: .5% 3%;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
}

.button:hover {
  background-color: #42b983;
}

.free {
  padding: 50px;
  text-align: center;
  color: white;
}
.free:hover{
  transform: scale(1.1);
  transition: .4s ease-in-out;
  background-color: #42b983;
  color: lightgray;
}
.about-section:hover{
  transform: scale(1.0);
  transition: .4s ease-in-out;
  background-color: #42b983;
  color: lightgray;
}


@media screen and (max-width: 750px) {
  .column {
    width: 100%;
    display: block;
    font-size: 3vw;
    align-items: center;
  }
  .container{
    text-align: center;
    
  }
}
</style>
