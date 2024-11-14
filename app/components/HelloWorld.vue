<template>
    <h1>{{ message }}</h1>

    <div class="card">
        <Btn
            class="Btn"
            kind="primary"
            :label="`count is ${count}`"
            @click="increment()" />
    </div>
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
  color: white
}
</style>
