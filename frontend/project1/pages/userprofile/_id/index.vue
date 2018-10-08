<template v-if = "!res.errorFlag">
<section>
    <label>User Email:</label> <p>{{ res.email }}</p>
    <label>First Name :</label> <p>{{ firstName }}</p>
    <label>Last Name:</label> <p>{{ lastName }}</p>
    <label>Phone:</label> <p>{{ phone }}</p>
    <label>Subscription Ends on: </label> <p>{{ subscriptionEnds }}</p>
</section>
</template>

<template v-if = "errorFlag">
    <section>
        <label>Error Msg:</label> <p>{{ JSON.stringify(errorMsg) }}</p>
    </section>
</template>


<script>
import axios from 'axios';

export default {

    data(){
       return { 
        value: ''
       }
    },
    asyncData(context){
        let data = JSON.stringify(
            {
                "query": `{ getUserProfile (email: "${context.params.id}") { id firstName lastName email phone subscriptionValid subscriptionEnds readList errorFlag errorMsg successMsg } }`
            }
        )
        alert(data) 
        let headers = {
            headers: {
              'Content-type': 'application/json'
            }
          }
        axios.post("http://localhost:4000/graphql", data, headers)
        .then((response)=> {
            var res = response.data.data.getUserProfile[0]
            alert(JSON.stringify(res))
            if (!res.errorFlag){
                return JSON.stringify(res)
                // return {
                //     id: res[0].id,
                //     firstName: JSON.stringify(res[0].firstName),
                //     lastName: res[0].lastName,
                //     email: res[0].email,
                //     phone: res[0].phone,
                //     subscriptionValid: res[0].subscriptionValid,
                //     subscriptionEnds: new Date(res[0].subscriptionEnds).toLocaleDateString('en-GB', {
                //         day: 'numeric',
                //         month: 'short',
                //         year: 'numeric'
                //     }),
                //     readList: res[0].readList,
                //     errorFlag: JSON.stringify(res[0].errorFlag)
                // }
            }
            else {
                return JSON.stringify( 
                    {
                        errorMsg: res[0].errorMsg,
                        errorFlag: res[0].errorFlag
                    }
                )
            }
        })
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert("error.response.data: " + JSON.stringify(error.response.data))
                alert("error.response.status: " + JSON.stringify(error.response.status))
                alert("error.response.headers: " + JSON.stringify(error.response.headers))
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                alert("error.request: " + JSON.stringify(error.request))
            } else {
                // Something happened in setting up the request that triggered an Error
                alert("error.config: " + JSON.stringify(error.config))
                alert('error.message: ' + JSON.stringify(error.message))
            }
        })
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