<template>
  <section>
   <div>
   <div class="header">
        <input type="text" class="searchbox" v-model="search" name="search" placeholder="Enter book to search" />
    </div>
    <div class="content">
      <display-books thumbnail="http://togamas.com/css/images/items/potrait/JPEG_3686.jpg" title="Think and Grow Rich">
        </display-books>
        <!-- <display-books 
        v-for= "book in books"
        :key="book.id"
        :thumbnail="book.thumbnail"
        :title="book.title"
        :id="book.id" /> -->
    </div>
    </div>
  </section>
</template>

<script>
import displayBooks from "@/components/DispalyBooks.vue";
import axios from 'axios';
 export default {
   data (){
     return{
      // books: []
     }
   },
    components: {
    displayBooks
     } //,
    //  asyncData() {  //asyncData is call before loading component
    //    return axios.get('http://serverurl')   //in case of params it would be http://url/$params
    //    .then((res) => {
    //      return { 
    //        books= res.data.value
    //      }
    //    })
    //    .catch(
    //         (error) =>console.log(error)
    //     );
    //  }
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
</style>


