<template>
<sction>
    <label>User Email:</label> <p>{{useremail}}</p>
    <label>User Email:</label> <p>{{useremail}}</p>
    <label>User Email:</label> <p>{{useremail}}</p>
    <div>
        <button type="button" class="manageSubCancel" @click="cancelSub">Cancel</button>
    </div>
</sction>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        useremail:''
    },
    // asyncData() {  //asyncData is call before loading component
    //    return axios.get('/manage_subscription/this.useremail')   //in case of params it would be http://url/$params
    //    .then((res) => {
    //      return { 
           
    //      }
    //    })
    //    .catch(
    //         (error) =>console.log(error)
    //     );
    // },
    methods:{

    }
}

</script>