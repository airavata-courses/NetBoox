<template>
<section>
    <label>First Name:</label> <p>{{ firstName }}</p>
    <label>Last Name:</label> <p>{{ lastName }}</p>
    <label>User Email:</label> <p>{{ email }}</p>
    <label>Phone:</label> <p>{{ phone }}</p>
    <label>Subscription Start_Date:</label> <p>{{ subStartDate }}</p>
    <label>Subscription End_Date:</label> <p>{{ subEndDate }}</p>
    <!-- <div>
        <button type="button" class="manageSubCancel" @click="cancelSub">Cancel</button>
    </div> -->
</section>
</template>

<script>
export default {
    props: ['firstName', 'lastName', 'email', 'phone', 'subStartDate', 'subEndDate']
}
</script>

<style>

</style>
