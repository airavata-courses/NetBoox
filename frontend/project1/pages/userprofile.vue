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
        useremail:'',
        phone:'',
        subscriptionValid:'',
        subscriptionEnds:'',
        readList:[]
       }
    },
    props: [email],
    // asyncData() {  

    //    axios.post('localhost:4000/graphql/',   {
    //            "query": "{ getAllUserProfiles{ _id firstName phone email } }" 
    //            }
    //    )   
    //    data = JSON.stringify(data)
    //                 $.ajax({
    //                     type: "POST",
    //                     //url: "http://localhost:4000/graphql",
    //                     url: "http://389f207a.ngrok.io/graphql",
    //                     contentType: "application/json",
    //                     data : data,
    //                     success : function(res) {
    //                         var out = res
    //                         console.log(out)
    //                     },
    //                 });
    //    .then((res) => {
    //        console.log(res)  
    //    })
    //    .catch(
    //         (error) =>console.log(error)
    //     );
   // },
    methods:{

    }
}

</script>