<template>
  <section>
   <div>
   <div class="header">
        <!-- <input type="text" class="searchbox" v-model="search" name="search" placeholder="Enter book to search" /> -->
        <!-- <input type="text" class="searchbox" name="search" placeholder="Enter book to search" /> -->
        <div class="header-buttons">
         <nuxt-link :to="'/userprofile/' + email" ><button type="button" class="userProfile">My Profile</button> </nuxt-link> 
         <nuxt-link :to="'/manageSub/' + email"><button type="button" class="manageSub">Manage Subscription</button></nuxt-link>
        </div>
    </div>
    <div class="content">
      <!-- <display-books thumbnail="http://togamas.com/css/images/items/potrait/JPEG_3686.jpg" title="Think and Grow Rich">
        </display-books> -->
        <!-- <p>{{$route.params.email}}</p> -->
      <DisplayBooks
        v-for = "book in books"
        :key="book.id"
        :title="book.title"
        :authors="book.authors"
        :edition="book.edition"
        :desc="book.desc"
        :link="book.link"
        :imageLocation="book.imageLocation" />
    </div>
    </div>
  </section>
</template>

<script>
import DisplayBooks from "@/components/DisplayBooks.vue";
import axios from 'axios';

export default {
  data () {
    return{
      email: this.$route.query.email,
      books: [{id:"563782",title:"Hello",author:"Ram",edition:"2nd edi",desc:"hjhsjahd",link:"http://www.google.com",imageLocation:"http://www.google.com"},
      {id:"563782",title:"Hello",author:"Ram",edition:"2nd edi",desc:"hjhsjahd",link:"http://www.google.com",imageLocation:"http://www.google.com"},
      {id:"563782",title:"Hello",author:"Ram",edition:"2nd edi",desc:"hjhsjahd",link:"http://www.google.com",imageLocation:"http://www.google.com"},
      {id:"563782",title:"Hello",author:"Ram",edition:"2nd edi",desc:"hjhsjahd",link:"http://www.google.com",imageLocation:"http://www.google.com"},
      {id:"563782",title:"Hello",author:"Ram",edition:"2nd edi",desc:"hjhsjahd",link:"http://www.google.com",imageLocation:"http://www.google.com"}]
    }
  },

  components: {
    DisplayBooks
  },
// //need to check by Harshall
//   async asyncData () {
//     let payload = {
//       // path: '/NetBoox/UserProfileService'
//       path: '/Netbux_Microservice/netbux/getbooks'
//     }

//     let headers = {
//       headers: {
//         'Content-type': 'application/json'
//       }
//     }

//     let serviceDiscoveryURL = 'http://localhost:30006/discoverService'

//     let urlData = await axios.post(serviceDiscoveryURL, payload, headers)

//     let url
//     if (!urlData.data.errorFlag) {
//       url = `http://${urlData.data.host}:${urlData.data.port}/Netbux_Microservice/netbux/getbooks`
//       console.log("URL: ", url)
//     }
//     else {
//       console.log("Service does not exists")
//       return
//     }
//     // let response = await axios.get('http://js-169-242.jetstream-cloud.org:8080/Netbux_Microservice/netbux/getbooks/')
//     let response = await axios.get(url)
//     return {
//       books : response.data
//     }
//   }
 };
</script>

<style>
  .header { 
    width: 100%;
    height: 50px;
    background-color: cornflowerblue;
  }
  button {
    background-color: #4CAF50;
    height: 1%;
    padding: 14px 20px;
    cursor: pointer;
}
  .searchbox {
    width: 40%;
    margin-top: 10px;
    margin-left: 350px;
    font-weight: 30;
    font-size: 18px;
    color: black;
  }


  .header-buttons {
      float: right;
  }
</style>


