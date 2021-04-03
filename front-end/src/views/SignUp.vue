<template>
  <div class="SignUp">
    <div class="sign-up_title">
      <p>Welcome to Twitcherest</p>
        </div>
        <div class="sign-up_container">
            <div class="form-title">
                <p class="sign-up-header">Sign Up Today!</p>
            </div>
            <div class="sign-up_form">
                <form action="/action_page.php">
                    <label for="fname">First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your name..">
                    <br>
                    <label for="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name..">
                    <br>
                    <label for="country">Country</label>
                    <select id="country" name="country">
                      <option value="australia">Australia</option>
                      <option value="canada">Canada</option>
                      <option value="usa">USA</option>
                    </select>
      
                    <input type="submit" value="Submit">
                </form>
            </div>
        </div>
  </div>
</template>

<style>
.form-title {
    text-align: center;
    color: #cdcdcd;
    font-size: 30px;
    padding: 0px;
}

.sign-up_container {
    background-color: #42b983;
    color: white;
    margin: 0 auto;
    margin-bottom: 70px;
    display: border-box;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    max-width: 600px;
}

.sign-up_title {
    display: border-box;
    padding: 20px;
    justify-content: center;
    text-align: center;
    color: #adadad;
    font-size: 50px;
}

.sign-up_form {
    padding: 20px;
    width: 100%;
    display: flex;
    background-color: #c2c2c6;
    color: black;
    justify-content: center;
    align-items: stretch;
    border-radius: 10px;
}

input[type=text], select {
    width: 100%;
    color: #adadad;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 25px;
    border-radius: 5px;
}

input[type=submit] {
    width: 100%;
    background-color: white;
    color: black;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

input[type=submit]:hover {
    color: #42b983;
}

.sign-up-header{
  color: black;
}


</style>

