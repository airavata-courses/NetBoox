<template>
<sction>
    <h1>Manage Subscription</h1>
    <label>User Email:</label> <p>{{sub.email}}</p>
    <label>Phone:</label> <p>{{sub.phone}}</p>
    <label>Subscription Start_Date:</label> <p>{{sub.startDate}}</p>
    <label>Subscription End_Date:</label> <p>{{sub.endDate}}</p>
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
           sub: []
    }
    },
    props: [ email],

    asyncData() {  
       return axios.get('/manage_subscription/find/',{
        params : {email: this.email}
        })   
       .then((response =>this.sub =response.data)
        )
       .catch((error) =>console.log(error)
       );
    },
    methods:{
    cancelSub(){
        this.SubscriptionValid="False"
        axios.get('/manage_subscription/delete/',{
        params : {email: this.email}
        })  
        .then((res) => {
          console.log(res)
        })
        .catch((error) =>console.log(error)
       );
    }

    }
}

</script>