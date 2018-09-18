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
        useremail:''
    },
    asyncData() {  //asyncData is call before loading component
       return axios.get('localhost:4000/graphql')   //in case of params it would be http://url/$params
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