<template>
    <h1>{{ message }}</h1>

    <Btn
        class="Btn"
        kind="primary"
        :label="`count is ${count}`"
        @click="increment()" />
    
    <RouterLink
        to="/about"
        title="Go to About">
        <Btn
            class="Btn"
            kind="primary"
            label="Go to  About"/>
    </RouterLink>
</template>

<script>
export default {

    inject: ['helloWorld'],

    computed: {
    
        message() {
            return this.helloWorld.message;
        },

        count() {
            return this.helloWorld.count;
        }
        
    },

    methods: {
        increment() {
            return this.helloWorld.incrementCount();
        }
    }

};
</script>

<style scoped>
.Btn {
  color: white;
  margin: var(--sp2);
}
</style>
