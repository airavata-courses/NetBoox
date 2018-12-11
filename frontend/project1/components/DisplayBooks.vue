<template>
<section class="books">
    <article class="book">
        <div class="thumbnail" :style="{backgroundImage: 'url(' + imageLocation + ')'}"> </div>
        <h1>{{title}}</h1>
        <ul id="authors">
            <li v-for="author in authors" :key="author.id">
                {{author.firstName}} {{author.lastName }}
            </li>
        </ul>
        <!-- <p>{{edition}}</p> -->
        <p>{{desc}}</p>
        <!-- <img :src="imageLocation" alt="Book Thumbnail" width="100px" height="50px"><br /> -->
        <a :href="link + '#toolbar=0&navpanes=0&scrollbar=0'" target="_blank">Click to open book</a>
    </article>

</section>
</template> 

<script>
export default{
    props: ['title', 'authors', 'edition', 'desc', 'link', 'imageLocation']
}
</script>

<style scoped>

    .books {
        display: flex;
        float: left;
        align-items: center;
        justify-content: center;
        margin: 1% 0 2% 2%; 
    } 
 
     .book {
        box-sizing: border-box;
        padding: 2px;
        width: 250px;
        border: 1px solid #ccc;
        margin: 2px;
    }
    .thumbnail {
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 250px;
    }
</style>