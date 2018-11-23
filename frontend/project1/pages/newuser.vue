<template>
<section>
    <div class="signupform">
    <h1>Sign Up</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>

    <label>First Name</label>
    <input type="text" class="entry" v-model="firstname" placeholder="Enter First Name" name="firstname" required>
    
    <label>Last Name</label>
    <input type="text" class="entry" v-model="lastname" placeholder="Enter Last Name" name="lastname" required>

    <label>Email</label>
    <input type="text" class="entry" v-model="email" placeholder="Enter Email" name="email" required>

    <label>Phone</label>
    <input type="text" class="entry" v-model="phone" placeholder="Enter Phone" name="phone" required>


    <label>Password</label>
    <input type="password" class="entry" v-model="password" placeholder="Enter Password" name="password" required>

    <label>Repeat Password</label>
    <input type="password"  class="entry" v-model="password_rpt" placeholder="Repeat Password" name="password-repeat" required>
    <p>{{message}}</p>
    <div>
      <button type="submit" class="signupbtn" :v-bind="onSubmitted">Sign Up</button>
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
            firstname:"",
            lastname:"",
            email: "",
            phone:"",
            password: "",
            password_rpt: "",
            message: ""
        }
    },
    
    method: {
        onSubmitted() {
            if(password_rpt == password){

               // post username and password to server
            //     let payload = {
            //            path: '/NetBoox/UserProfileService'
            //     }
            //     let headers = {
            //             headers: {
            //                   'Content-type': 'application/json'
            //             }
            //     }
            //     let serviceDiscoveryURL = 'http://localhost:4007/discoverService'
            //     let urlData = await axios.post(serviceDiscoveryURL, payload, headers)
            //     let url
            //     if (!urlData.data.errorFlag) {
            //         url = `http://${urlData.data.host}:${urlData.data.port}/graphql`
            //     }
            //     else {
            //         console.log("Service does not exists")
            //         return
            //     }
            //     //need to check by Sagar
            //     let data = JSON.stringify(
            //     {
            //         "query": `{ addUserProfile (firstName: ${this.firstname}, lastName: ${this.lastname}, email: ${this.email} , 
            //                   phone: ${this.phone}, password: ${this.password}) { id firstName lastName email phone password readList errorMsg } }`
            //     }   
            // )   

            // try {
            //     let output = await axios.post(url, data, headers)
            //     // console.log(JSON.stringify(output))
            //     var res = output.data.data.addUserProfile[0]  //need to check by Sagar
            //     if (!res.errorFlag){
            //         return {
            //             id: res.id,
            //             firstName: res.firstName,
            //             lastName: res.lastName,
            //             email: res.email,
            //             phone: res.phone,
            //             subscriptionEnds: res.subscriptionEnds,
            //             readList: res.readList,
            //             errorFlag: res.errorFlag
            //         }
            //     }
            //     else {
            //         return {
            //             errorMsg: JSON.stringify(res.errorMsg)
            //         }
            //     }
            // }       
            // catch(error) {
            //     if (error.response) {
            //         // The request was made and the server responded with a status code
            //         // that falls out of the range of 2xx
            //         console.log("error.response.data: " + JSON.stringify(error.response.data))
            //         console.log("error.response.status: " + JSON.stringify(error.response.status))
            //         console.log("error.response.headers: " + JSON.stringify(error.response.headers))
            //     } else if (error.request) {
            //     // The request was made but no response was received
            //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //     // http.ClientRequest in node.js
            //         console.log("error.request: " + JSON.stringify(error.request))
            //     } else {
            //     // Something happened in setting up the request that triggered an Error
            //         console.log("error.config: " + JSON.stringify(error.config))
            //         console.log('error.message: ' + JSON.stringify(error.message))
            //     }
            // }
        }else {
                message="Password doesn't match";
        }
                
    }
}

}

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