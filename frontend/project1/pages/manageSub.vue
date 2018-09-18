<template>
<sction>
    <h1>Manage Subscription</h1>
    <label>User Email:</label> <p>{{data.useremail}}</p>
    <label>Subscription Start_Date:</label> <p>{{data.startDate}}</p>
    <label>Subscription End_Date:</label> <p>{{data.endDate}}</p>
    <div>
        <button type="button" class="manageSubCancel" @click="cancelSub">Cancel</button>
    </div>
</sction>
</template>

<script>
import axios from 'axios';

export default {
    data(){ 
        return {
           data: []
    }
    },
    props: [ useremail ,SubscriptionValid],

    asyncData() {  //asyncData is call before loading component
       return axios.get('/manage_subscription/',{
                        params : {
                        email: this.useremail}
                        })   
       .then((res) => {
         return { 
              data=res.data.value
         }
       })
       .catch(
            (error) =>console.log(error)
        );
    },
    methods:{
        cancelSub(){
            this.SubscriptionValid="False"
            axios.get('/manage_subscription/${params}/update',{
                        params : {
                        email: this.useremail,
                        SubscriptionValid: this.SubscriptionValid }
                        })  
       .then((res) => {
           console.log(res)
       })
       .catch(
            (error) =>console.log(error)
        );

        }

    }
}

</script>