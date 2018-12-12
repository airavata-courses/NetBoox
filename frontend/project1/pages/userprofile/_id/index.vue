<template>
<section>
    
   <div class="header">
        <!-- <input type="text" class="searchbox" v-model="search" name="search" placeholder="Enter book to search" /> -->
        <!-- <input type="text" class="searchbox" name="search" placeholder="Enter book to search" /> -->
        
        <div class="header-buttons">
         <button type="button" class="home" @click="home()">Home</button>
                  <!-- <nuxt-link :to="'/userprofile/' + email" ><button type="button" class="userProfile">My Profile</button> </nuxt-link>  -->
         <nuxt-link :to="'/manageSub/' + email"><button type="button" class="manageSub">Manage Subscription</button></nuxt-link>
         <nuxt-link :to="'/'"><button type="button" class="logout">LogOut</button></nuxt-link>
        </div>
    </div>
    <div class="display_details" >
        
      <div v-if = "!errorFlag">
        <h1> My Profile </h1><br/><br/>
        <p><label>User Email:</label> {{ email }}</p> <br/>
        <p><label>First Name :</label> {{ firstName }}</p><br/>
        <p><label>Last Name:</label> {{ lastName }}</p><br/>
        <p><label>Phone:</label> {{ phone }}</p><br/>
        <p><label>Subscription Starts: </label> {{ convertTimestampToHumanReadableFormat(subscriptionStarts) }}</p><br/>
    </div>
    <div v-else>
        <label>Error Msg:</label> <p>{{ errorMsg }}</p>
    </div>
    </div>



</section>
</template>

<script>

import axios from 'axios';

export default {
    async asyncData( context ){
        let payload = {
            path: '/NetBoox/UserProfileService'
        }
          
        let headers = {
            headers: {
              'Content-type': 'application/json'
            }
        }

        let url
        let serviceDiscoveryURL = 'http://localhost:30006/discoverService'
        let urlData = await axios.post(serviceDiscoveryURL, payload, headers)
        if (!urlData.data.errorFlag) {
            url = `http://${urlData.data.host}:${urlData.data.port}/graphql`
        }
        else {
            console.log("Service does not exists")
            return
        }
        let data = JSON.stringify(
            {
                "query": `{ getUserProfile (email: "${context.params.id}") { id firstName lastName email phone subscriptionValid subscriptionStarts readList errorFlag errorMsg successMsg } }`
            }
        )

        try {
            let output = await axios.post(url, data, headers)
            var res = output.data.data.getUserProfile[0]
            if (!res.errorFlag){
                return {
                    id: res.id,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    phone: res.phone,
                    subscriptionStarts: res.subscriptionStarts,
                    readList: res.readList,
                    errorFlag: res.errorFlag
                }
            }
            else {
                return {
                    errorMsg: JSON.stringify(res.errorMsg)
                }
            }
        } 
        catch(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("error.response.data: " + JSON.stringify(error.response.data))
                console.log("error.response.status: " + JSON.stringify(error.response.status))
                console.log("error.response.headers: " + JSON.stringify(error.response.headers))
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log("error.request: " + JSON.stringify(error.request))
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("error.config: " + JSON.stringify(error.config))
                console.log('error.message: ' + JSON.stringify(error.message))
            }
        }
    },

    methods:{
        convertTimestampToHumanReadableFormat: function(date) {
            var formatted_date=new Date(date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
               return formatted_date
        },
        home:function(){
            this.$router.push({ name:'books', query: { email: this.email } })
        }
    }
}

</script>
<style scoped>
.display_details {
 display: flex;
justify-content: center;
margin:0 auto; 
padding-bottom: 2%;
padding-top: 2%;
line-height: 20px;
}
.p{
   padding: 10px; 
}
</style>
