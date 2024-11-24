<template>
    <h1>About</h1>

    <p>Something about something</p>

    <RouterLink
        to="/"
        title="Go Home">
        <Btn
            class="Btn"
            kind="primary"
            label="Go Home" />
    </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AboutManager } from '../managers/AboutManager';

export default {

    inject: {
        about: {
            from: 'about',
            default: null as AboutManager | null,
        },
    },
};
</script>

<style scoped>
</style>
