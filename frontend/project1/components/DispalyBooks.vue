<template>
<section class="books">
    <article class="book">
        <div class="thumbnail" :style="{backgroundImage: 'url(' + thumbnail + ')'}"> </div>
        <h1>{{title}}</h1>
    </article>

</section>
</template> 

<script>
export default{
    props: ['thumbnail', 'title']
}
</script>
<style scoped>
.books {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}
.book {
    box-sizing: border-box;
    width: 280px;
    padding: 8px;
    border: 1px solid #ccc;
    margin-top: 2px;
}
.thumbnail {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 250px;
}
    </style>