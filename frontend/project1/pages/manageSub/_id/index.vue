<template>
    <!-- <section>
        <h1>Manage Subscription</h1>
        <ManageUserSubscription
            v-for = "sub in subscriptions"
            :key="sub.id"
            :firstName="sub.firstname"
            :lastName="sub.lastname"
            :email="sub.email"
            :phone="sub.phone"
            :subStartDate="sub.startDate"
            :subEndDate="sub.endDate" />
    </section> -->


<section>
    <div class="header">
        <!-- <input type="text" class="searchbox" v-model="search" name="search" placeholder="Enter book to search" /> -->
        <!-- <input type="text" class="searchbox" name="search" placeholder="Enter book to search" /> -->
        
        <div class="header-buttons">
         <button type="button" class="home" @click="home()">Home</button>
         <nuxt-link :to="'/userprofile/' + email" ><button type="button" class="userProfile">My Profile</button> </nuxt-link> 
         <nuxt-link :to="'/'"><button type="button" class="logout">LogOut</button></nuxt-link>
        </div>
    </div>
    <div class="display_details" >
    <h1>Manage Subscription</h1>
    <label>User Email:</label> <p>{{user_subscription_data.email}}</p>
    <label>Subscription Valid:</label> <p>{{user_subscription_data.subscriptionValid}}</p>
    <label>Subscription Start_Date:</label> <p>{{convertTimestampToHumanReadableFormat(user_subscription_data.subscriptionStartDate)}}</p>
    <!-- <label>Subscription End_Date:</label> <p>{{convertTimestampToHumanReadableFormat(user_subscription_data.subscriptionEndDate)}}</p> -->
    <div>
        <button type="button" class="manageSubCancel" @click="cancelSub(user_subscription_data.email)">Cancel</button>
    </div>
    </div>
</section>
</template>

<script>
import axios from 'axios'

export default {

    data() {
        return {
            headers: {"Content-type": "application/json"},
        }
    },

        
    async asyncData( context ) {
        let payload = {
            path: '/NetBoox/SubscriptionService'
        }
          
        let headers = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        // let url
        // let serviceDiscoveryURL = 'http://localhost:30006/discoverService'
        // let urlData = await axios.post(serviceDiscoveryURL, payload, headers)
        // if (!urlData.data.errorFlag) {
        //     url = `http://${urlData.data.host}:${urlData.data.port}/manage_subscription/`
        // }
        // else {
        //     console.log("Service does not exists")
        //     return
        // }
        let url = 'http://149.165.170.107:30002/manage_subscription/'
        try {
            // console.log("context.params.id: ", context.params.id)
            let response = await axios.get(url + `findOneUser/${ context.params.id }`)
            // console.log("response: ", response)
            let user_subscription_data = response.data
            // console.log(user_subscription_data)
            return {
                user_subscription_data
            }
        }
        catch (error) {
            console.log("Error: ", error)
        }
    },

    methods:{
        async cancelSub(email){
            let params = {
                email: email
            }

            let payload = {
                path: '/NetBoox/SubscriptionService'
            }

            // let url
            // let serviceDiscoveryURL = 'http://localhost:30006/discoverService'
            // let urlData = await axios.post(serviceDiscoveryURL, payload, this.headers)
            // if (!urlData.data.errorFlag) {
            //     url = `http://${urlData.data.host}:${urlData.data.port}/manage_subscription/`
            // }
            // else {
            //     console.log("Service does not exists")
            //     return
            // }
            let url = 'http://149.165.170.107:30002/manage_subscription/'
            try{
                let response = await axios.post(url + 'cancelSubscription', params, this.headers )
                if (response.data.acknowledged && response.data.modified_count == 1){
                    // Go to login page as the subscription has ended and the user must be logged out
                    router.push({ name: 'index'}) //need to check whether page reload as new one or not if not, add force: true
                }
            }
            catch(error) {
                console.log("Error: ", error)
            }
        },
         home:function(){
             if(user_subscription_data)
             {
                 this.$router.push({ name:'books', query: { email: user_subscription_data.email } })
             }
             else
             {
                 this.$router.push({ name:'books', query: { email: this.email }})
             }
        },
        convertTimestampToHumanReadableFormat: function(date) {
           var formatted_date= new Date(date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            return formatted_date
    }
 }
}
</script>