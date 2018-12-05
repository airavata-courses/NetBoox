<template>
  <section class="container">
    <div>
    
      <h1 class="title">
        Welcome to NetBoox
      </h1>
     <div class="form-group">
                <label>Email: </label>
                <input type="text" v-model="email" name="email" />
            </div>
            <div class="form-group">
                <label>Password: </label>
                <input type="password" v-model="password" name="password" />
            </div>
            <div class="form-group">
                <!-- <button class="btn" @click="validate()">Login</button> -->
                <button class="btn" @click="quicklogin()">Login</button>
                <nuxt-link to="/newuser"><button class="btn">Register</button></nuxt-link>
            </div>
            <p v-if="!loginSuccessful">
              <b>{{ errorMsg }}</b>
            </p>
       </div>
  </section>
</template>

<script>
import axios from 'axios';
 export default {
  data () {
    return { 
      email:'',
      password: '',
      loginSuccessful: '',
      errorMsg:''
    }
    },
    methods: {
      quicklogin : async function(){

        if(this.email && this.password)
        {
          router.push({ name: 'books'})
        }

      },
      validate : async function () {
        if (this.email && this.password)
        {
          let payload = {
            path: '/NetBoox/userProfile'
          }
          
          let headers = {
            headers: {
              'Content-type': 'application/json'
            }
          }

          let serviceDiscoveryURL = 'http://localhost:4007/discoverService'
          let urlData = await axios.post(serviceDiscoveryURL, payload, headers)
          let url
          if (!urlData.data.errorFlag) {
            url = `http://${urlData.data.host}:${urlData.data.port}/graphql`
          }
          else {
            console.log("Service does not exists")
            return
          }

          let query = JSON.stringify(
            {
              "query": `{ verifyLogin (email: "${this.email}", password: "${this.password}" ) { successMsg errorMsg errorFlag } }`
            }
          )
          
          axios.post(url, query, headers)
            .then((response) => {
              var res = response.data.data.verifyLogin
              if (res.errorFlag){
                this.loginSuccessful = false
                this.errorMsg = res.errorMsg
              }
              else{
                this.loginSuccessful = true
                this.$router.push({ name:'books', params: { email: this.email } })
              }
            })
            .catch((error) => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert("error.response.data: " + JSON.stringify(error.response.data))
                alert("error.response.status: " + JSON.stringify(error.response.status))
                alert("error.response.headers: " + JSON.stringify(error.response.headers))
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                alert("error.request: " + JSON.stringify(error.request))
              } else {
                // Something happened in setting up the request that triggered an Error
                alert("error.config: " + JSON.stringify(error.config))
                alert('error.message: ' + JSON.stringify(error.message))
              }
            })
        }
        else{
          this.loginSuccessful = false
          this.errorMsg = "Please provide email and password to login"
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
    height: 2%;
    padding: 14px 20px;
    cursor: pointer;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif; /* 1 */
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

