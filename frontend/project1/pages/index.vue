<template>
  <section class="container">
    <div>
    
      <h1 class="title">
        Welcome NetBux
      </h1>
     <div class="form-group">
                <label>Username</label>
                <input type="text" v-model="username" name="username" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" name="password" />
            </div>
            <div class="form-group">
                <button class="btn" @click="validate()">Login</button>
                <nuxt-link to="/newuser"><button class="btn">Register</button></nuxt-link>
            </div>
            <p v-if="loginSuccessful">
              <b>Please check if you have entered username and password</b>
            </p>
       </div>
  </section>
</template>

<script>
import axios from 'axios';
 export default {
  data () {
    return { 
      username:'',
      password: '',
      loginSuccessful: ''
    }
    },
    methods: {
      validate : function() {
        if (this.username && this.password)
        {
          // axios.post('https://httpbin.org/post',{
          //   username: this.username, 
          //   password: this.password})
          
          // .then((res) => {
          //           this.loginSuccessful = result.data;  //assuming if valid return true
          //   })
          // .catch((error) => {
          //           console.error(error);
          //   });
          
          this.loginSuccessful ="True";  //remove once axios comes live
          this.$router.push("/books"); // to send post any values just add "/books"+ this.username
        }
        else{
          this.loginSuccessful ="False"
        }
      }

    }


 };
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    cursor: pointer;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.form-group{
  font-weight: 300;
  font-size: 30px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

</style>

