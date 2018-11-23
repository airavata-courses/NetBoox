<template>
<section class="books">
    <article class="book">
        <!-- <div class="thumbnail" :style="{backgroundImage: 'url(' + thumbnail + ')'}"> </div> -->
        <h1>{{title}}</h1>
        <ul id="authors">
            <li v-for="author in authors" :key="author.id">
                {{author.firstName}} {{author.lastName }}
            </li>
        </ul>
        <p>{{edition}}</p>
        <p>{{desc}}</p>
        <p>{{imageLocation}}</p>
        <a :href="link" target="_blank">Click to open book</a>
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