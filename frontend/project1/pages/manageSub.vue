<template>
<sction>
    <label>User Email:</label> <p>{{useremail}}</p>
    <label>Subscription Start_Date:</label> <p>{{}}</p>
    <label>Subscription End_Date:</label> <p>{{useremail}}</p>
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
            useremail:'',
            startDate:'',
            endDate:'',
            data: []
    },
    asyncData() {  //asyncData is call before loading component
       return axios.get('/manage_subscription/',{
                        params : {
                        email: this.useremail}
                        })   //in case of params it would be http://url/$params
       .then((res) => {
         return { 
              
         }
       })
       .catch(
            (error) =>console.log(error)
        );
    },
    methods:{

    }
}

</script>