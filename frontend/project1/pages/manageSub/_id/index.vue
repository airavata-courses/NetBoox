<template>
<section>
    <h1>Manage Subscription</h1>
    <label>User Email:</label> <p>{{sub.email}}</p>
    <label>Phone:</label> <p>{{sub.phone}}</p>
    <label>Subscription Start_Date:</label> <p>{{sub.startDate}}</p>
    <label>Subscription End_Date:</label> <p>{{sub.endDate}}</p>
    <div>
        <button type="button" class="manageSubCancel" @click="cancelSub">Cancel</button>
    </div>
</section>
</template>

<script>
import axios from 'axios';
export default {
    data(){ 
        return {
           sub: []
           }
    },

    asyncData() {  //u can use created() instead
        return axios.post('http://127.0.0.1:5000/manage_subscription/find/',{body: this.params})   //{body:this.params}
       .then((res) =>{
           return {sub: res.data.result}
        })
       .catch((error) =>console.log(error)
       );
    },
    methods:{
        // created () {
        //     axios.get('http://')
        //     .then(res => console.log(res))
        //     .catch(error =>console.log(error))
        // },
    cancelSub(){
        this.SubscriptionValid="False"
        axios.get('/manage_subscription/delete/',{
        params : {email: $route.params.email}
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