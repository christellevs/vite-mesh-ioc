<template>
    <div class="Root">
        <HelloWorld />
    </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue';

export default {

    components: {
        HelloWorld,
    },

};
</script>

<style scoped>
.Root {
    position: relative;
    padding: var(--sp2);
}
</style>
