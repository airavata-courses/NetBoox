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
    <h1>Manage Subscription</h1>
    <label>First Name:</label> <p>{{ user_subscription_data.firstname }}</p>
    <label>Last Name:</label> <p>{{ user_subscription_data.lastname }}</p>
    <label>User Email:</label> <p>{{user_subscription_data.email}}</p>
    <label>Phone:</label> <p>{{user_subscription_data.phone}}</p>
    <label>Subscription Valid:</label> <p>{{user_subscription_data.subscriptionvalid}}</p>
    <label>Subscription Start_Date:</label> <p>{{user_subscription_data.startDate}}</p>
    <label>Subscription End_Date:</label> <p>{{user_subscription_data.endDate}}</p>
    <div>
        <button type="button" class="manageSubCancel" @click="cancelSub(user_subscription_data.email)">Cancel</button>
    </div>
</section>
</template>

<script>
import axios from 'axios'

export default {

    data() {
        return {
            headers: {"Content-type": "application/json"},
            // url: "http://127.0.0.1:4002/manage_subscription/",
        }
    },

        
    async asyncData( context ) {
        let payload = {
            path: '/NetBoox/manageSubscription'
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
            url = `http://${urlData.data.host}:${urlData.data.port}/manage_subscription/`
        }
        else {
            console.log("Service does not exists")
            return
        }

        // let url = 'http://127.0.0.1:4002/manage_subscription/'

        try {
            let response = await axios.get(url + `findOneUser/${ context.params.id }`)
            let user_subscription_data = response.data
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
                path: '/NetBoox/manageSubscription'
            }

            let serviceDiscoveryURL = 'http://localhost:4007/discoverService'
            let urlData = await axios.post(serviceDiscoveryURL, payload, this.headers)
            let url
            if (!urlData.data.errorFlag) {
                url = `http://${urlData.data.host}:${urlData.data.port}/manage_subscription/`
            }
            else {
                console.log("Service does not exists")
                return
            }

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
        }
    }
}
</script>