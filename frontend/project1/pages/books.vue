<template>
  <section>
   <div>
   <div class="header">
        <!-- <input type="text" class="searchbox" v-model="search" name="search" placeholder="Enter book to search" /> -->
        <!-- <input type="text" class="searchbox" name="search" placeholder="Enter book to search" /> -->
        <!-- <button class="btn"><i class="fa fa-home"></i></button> -->
         
        <div class="header-buttons">
         <button type="button" class="home" @click="home()">Home</button> 
         <nuxt-link :to= "'/userprofile/' + email" ><button type="button" class="userProfile">My Profile</button> </nuxt-link> 
         <nuxt-link :to= "'/manageSub/' + email"><button type="button" class="manageSub">Manage Subscription</button></nuxt-link>
         <nuxt-link :to= "'/'"> <button type="button" class="logout">LogOut</button> </nuxt-link>
        </div>
    </div>
    <div class="content">
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
    }
  },

  components: {
    DisplayBooks
  },
//need to check by Harshall
  async asyncData () {
    let payload = {
      path: '/Netbux_Microservice/netbux/books/getBooks'
    }

    let response = await axios.get(`http://149.165.170.107:30003${path}`)
    return {
      books : response.data
    }
  }, 
  methods : {
    home:function(){
      this.$router.push({ name:'books', query: { email: this.email } })
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


