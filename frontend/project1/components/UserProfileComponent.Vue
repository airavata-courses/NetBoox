<template>
    <section class="user-profile">
        <div v-if = "!errorFlag">
            <label>User Email:</label> <p>{{ email }}</p>
            <label>First Name :</label> <p>{{ firstName }}</p>
            <label>Last Name:</label> <p>{{ lastName }}</p>
            <label>Phone:</label> <p>{{ phone }}</p>
            <label>Subscription Ends on: </label> <p>{{ subscriptionEnds }}</p>
        </div>
        <div v-else>
            <label>Error Msg:</label> <p>{{ errorMsg }}</p>
        </div>
    </section>
</template>

<script>
export default {
    props: ['errorFlag', 'email', 'firstName', 'lastName', 'phone', 'subscriptionEnds', 'errorMsg'] 
}
</script>
