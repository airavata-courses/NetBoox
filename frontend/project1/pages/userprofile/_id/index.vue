<template>
<section>
    <div v-if = "!errorFlag">
        <label>User Email:</label> <p>{{ email }}</p>
        <label>First Name :</label> <p>{{ firstName }}</p>
        <label>Last Name:</label> <p>{{ lastName }}</p>
        <label>Phone:</label> <p>{{ phone }}</p>
        <label>Subscription Ends on: </label> <p>{{ convertTimestampToHumanReadableFormat(subscriptionEnds) }}</p>
    </div>
    <div v-else>
        <label>Error Msg:</label> <p>{{ errorMsg }}</p>
    </div>
</section>
</template>

<script>
import axios from 'axios';

export default {
    async asyncData( context ){

        let url = 'http://localhost:4001/graphql'

        let data = JSON.stringify(
            {
                "query": `{ getUserProfile (email: "${context.params.id}") { id firstName lastName email phone subscriptionValid subscriptionEnds readList errorFlag errorMsg successMsg } }`
            }
        )
        
        let headers = {
            headers: {
              'Content-type': 'application/json'
            }
        }

        try {
            let output = await axios.post(url, data, headers)
            // console.log(JSON.stringify(output))
            var res = output.data.data.getUserProfile[0]
            if (!res.errorFlag){
                return {
                    id: res.id,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    phone: res.phone,
                    subscriptionEnds: res.subscriptionEnds,
                    readList: res.readList,
                    errorFlag: res.errorFlag
                }
            }
            else {
                return {
                    errorMsg: JSON.stringify(res.errorMsg)
                }
            }
        } 
        catch(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("error.response.data: " + JSON.stringify(error.response.data))
                console.log("error.response.status: " + JSON.stringify(error.response.status))
                console.log("error.response.headers: " + JSON.stringify(error.response.headers))
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log("error.request: " + JSON.stringify(error.request))
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("error.config: " + JSON.stringify(error.config))
                console.log('error.message: ' + JSON.stringify(error.message))
            }
        }
    },

    methods:{
        convertTimestampToHumanReadableFormat: function(date) {
            new Date(date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
        }
    }
}

</script>