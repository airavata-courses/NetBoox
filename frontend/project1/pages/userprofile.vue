<template>
<section>
    <label>User Email:</label> <p>{{useremail}}</p>
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
        phone:'',
        email:'',
        subscriptionValid:'',
        subscriptionEnds:'',
        readList:[]
       }
    },
    asyncData() {  //asyncData is call before loading component
       return axios.post('localhost:4000/graphql/',
       {	"query": "{ getAllUserProfiles{ _id firstName phone email } }" }
       )   //in case of params it would be http://url/$params
       .then((res) => {
           console.log(res)  
       })
       .catch(
            (error) =>console.log(error)
        );
    },
    methods:{

    }
}

</script>