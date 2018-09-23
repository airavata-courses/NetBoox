<template>
<section>
    <label>User Email:</label> <p>{{email}}</p>
    <label>First Name :</label> <p>{{firstName}}</p>
    <label>Last Name:</label> <p>{{lastName}}</p>
    <label>Phone:</label> <p>{{phone}}</p>
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
            axios.post("http://40620c79.ngrok.io",{contentType: "application/json",params : data})
            .then((res)=> {
                return
                {
                    console.log(res)
                }
            })
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