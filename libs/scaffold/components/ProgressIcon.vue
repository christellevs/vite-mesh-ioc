<template>
    <svg
        class="ProgressIcon"
        :width="size"
        :height="size">
        <circle
            :cx="size / 2"
            :cy="size / 2"
            :r="radius"
            :style="pathStyle" />
    </svg>
</template>

<script>
export default {

    props: {
        size: { type: Number, default: 32 },
        thickness: { type: Number, default: 3 },
        progress: { type: Number, default: 0 },
    },

    computed: {

        radius() {
            return (this.size / 2) - this.thickness;
        },

        pathStyle() {
            const len = 2 * Math.PI * this.progress * this.radius;
            return {
                'stroke-width': `${this.thickness}px`,
                'stroke-dasharray': `${len} 1000`,
            };
        }

    }

};
</script>

<style scoped>
.ProgressIcon {
    --ProgressIcon-color: currentColor;
}

circle {
    stroke: var(--ProgressIcon-color);
    stroke-linecap: round;
    fill: none;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}
</style>
