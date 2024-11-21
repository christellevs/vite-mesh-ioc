<template>
    <div class="Root">
        <RouterView />
    </div>
</template>

<script>

export default {

    inject: [
        'router',
    ]

};
</script>

<style scoped>
.Root {
    position: relative;
    padding: var(--sp2);
}
</style>
