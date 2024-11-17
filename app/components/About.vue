<template>
    <h1>About</h1>

    <p>Something about something</p>
    
    <RouterLink
        to="/"
        title="Go Home">
        <Btn
            class="Btn"
            kind="primary"
            label="Go Home"/>
    </RouterLink>
</template>

<script>
export default {

    inject: ['about'],

};
</script>

<style scoped>
</style>
