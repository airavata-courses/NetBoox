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
      email: this.$route.params.email,
      books: []
    }
  },

  components: {
    DisplayBooks
  },

  async asyncData () {
    let response = await axios.get('http://js-169-242.jetstream-cloud.org:8080/Netbux_Microservice/netbux/getbooks/')
    return {
      books : response.data
    }
  }
 };
</script>

<style>
  .header { 
    width: 100%;
    height: 50px;
    background-color: cornflowerblue;
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


