<template>
<section>
    <label>User Email:</label> <p>{{email}}</p>
    <label>User :</label> <p>{{useremail}}</p>
    <label>User Email:</label> <p>{{useremail}}</p>
    <label>User Email:</label> <p>{{useremail}}</p>
</section>

</template>

<script>
import axios from 'axios';

export default {
    data(){
       return { 
        firstName:'',
        lastName:'',
        useremail:'',
        phone:'',
        subscriptionValid:'',
        subscriptionEnds:'',
        readList:[]
       }
    },
    asyncData(){
        let data = {"query": "{ getAllUserProfiles{ _id firstName phone email } }" }
            data = JSON.stringify(data)
            axios.post("http://389f207a.ngrok.io/graphql",{contentType: "application/json",params : data})
            .then(res=> console.log(res))
            .catch(error=>console.log(error))
    },
    methods:{
        // created(){
        //     let data = {"query": "{ getAllUserProfiles{ _id firstName phone email } }" }
        //     data = JSON.stringify(data)
        //     axios.post("http://389f207a.ngrok.io/graphql",{contentType: "application/json",params : data})
        //     .then(res=> console.log(res))
        //     .catch(error=>console.log(error))
        // }
                    
                
        
    }
}

</script>