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

        <div>
            <button type="button" class="manageSubCancel" @click="cancelSub">Cancel</button>
        </div>
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
            url: "http://127.0.0.1:5000/manage_subscription/",
        }
    },

        
    async asyncData( context ) {
        let url = 'http://127.0.0.1:5000/manage_subscription/'

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

            try{
                let response = await axios.post(this.url + 'deleteUser', params, this.headers )
                console.log(response)
                if (response.data.acknowledged && response.data.modified_count == 1){
                    // Go to login page as the subscription has ended and the user must be logged out. - Keerthi
                }
            }
            catch(error) {
                console.log("Error: ", error)
            }
        }
    }
}
</script>