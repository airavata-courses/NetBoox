<template>
<section>
    <div class="signupform">
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>

    <label>Username</label>
    <input type="text" class="entry" v-model="username" placeholder="Enter Username" name="username" required>

    <label>Password</label>
    <input type="password" class="entry" v-model="password" placeholder="Enter Password" name="password" required>

    <label>Repeat Password</label>
    <input type="password"  class="entry" v-model="password_rpt" placeholder="Repeat Password" name="password-repeat" required>
    <p>{{message}}</p>
    <div>
      <button type="submit" class="signupbtn">Sign Up</button>
      <button type="button" class="cancelbtn">Cancel</button>
    </div>
    </div>
</section>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            username: "",
            password: "",
            password_rpt: "",
            message: ""
        }
    },

    method: {
        // onSubmitted() {
        //     if(password_rpt == password){
        //         message="";
        //        // post username and password to server
        //         axios.post('http://serverurl', {
        //             username: this.username,
        //             password: this.password
        //             })
        //         .then(
        //             (response) => console.log(response)
        //         )
        //         .catch(
        //             (error) =>console.log(error)
        //         );
        //     }
        //     else{
        //        message="Password doesn't match";
        //     }
            
        // }
    }

};
</script>

<style>
.signupform {
  display: flex;
  flex-flow: column wrap;
  padding: 18px;
  width: 300px;
  align-items: center;
}

/* Full-width input fields */
.entry{
    width: 280px;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}
hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}
.cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
}


</style>