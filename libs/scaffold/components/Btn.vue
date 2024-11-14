<template>
    <button
        ref="button"
        class="Btn button"
        :class="[
            `Btn-${size}`,
            actualKind ? `Btn-${actualKind}` : null,
            {
                'Btn-disabled': disabled || blocked,
                'Btn-square': square,
                'Btn-round': round,
                'Btn-outline': outline,
            },
        ]"
        :disabled="disabled"
        :title="title || label"
        @uiactivate="onUiActivate($event)"
        @mousedown="onMouseDown($event)"
        @mouseup="onMouseUp($event)"
        @keydown.space="onSpaceDown($event)"
        @keyup="onKeyUp($event)"
        @mouseenter="onMouseEnter()"
        @mouseleave="onMouseLeave()"
        @focus="hover = true"
        @blur="hover = false">

        <ProgressIcon
            v-if="holdingAt > 0"
            class="HoldingIcon"
            :size="24"
            :progress="holdingProgress" />

        <i
            v-if="icon && holdingAt === 0"
            :class="[
                icon,
            ]"
            class="Icon" />

        <span
            v-if="actualLabel"
            class="Label">
            {{ actualLabel }}
        </span>

        <slot />
    </button>
</template>

<script>
export default {

    inject: [
        'ui'
    ],

    props: {
        label: { type: String },
        title: { type: String },
        icon: { type: String },
        kind: { type: String },
        hoverKind: { type: String },
        debounce: { type: Number, default: 0 },
        hold: { type: Number, default: 0 },
        holdLabel: { type: String },
        disabled: { type: Boolean, default: false },
        size: { type: String, default: 'normal' },
        square: { type: Boolean, default: false },
        round: { type: Boolean, default: false },
        outline: { type: Boolean, default: false },
    },

    data() {
        return {
            hover: false,
            blocked: false,
            holdingAt: 0,
            holdingProgress: 0,
        };
    },

    computed: {

        actualKind() {
            return this.hover ? (this.hoverKind ?? this.kind) : this.kind;
        },

        actualLabel() {
            return this.holdingAt > 0 ?
                (this.holdLabel ?? 'Hold to confirm') :
                this.label;
        },

    },

    methods: {

        onMouseDown(ev) {
            this.handleActivationEvent(ev);
        },

        onSpaceDown(ev) {
            this.handleActivationEvent(ev);
        },

        onMouseEnter() {
            this.hover = true;
        },

        onMouseLeave() {
            this.hover = false;
            this.cancelHolding();
        },

        onMouseUp() {
            this.cancelHolding();
        },

        onKeyUp() {
            this.cancelHolding();
        },

        onUiActivate() {
            if (this.debounce > 0) {
                this.blocked = true;
                setTimeout(() => {
                    this.blocked = false;
                }, this.debounce);
            }
        },

        handleActivationEvent(ev) {
            if (this.disabled || this.blocked) {
                ev.preventDefault();
                ev.stopPropagation();
                return false;
            }
            if (this.hold > 0) {
                this.blocked = true;
                this.holdingAt = Date.now();
                this.__timer = setTimeout(() => {
                    this.blocked = false;
                    this.holdingAt = 0;
                    this.ui.dispatchActivate(this.$refs.button, ev);
                }, this.hold);
                requestAnimationFrame(this.updateHoldingProgress);
                ev.preventDefault();
                ev.stopPropagation();
                return false;
            }
        },

        updateHoldingProgress() {
            if (this.holdingAt === 0) {
                return;
            }
            this.holdingProgress = Math.min((Date.now() - this.holdingAt) / this.hold, 1);
            requestAnimationFrame(this.updateHoldingProgress);
        },

        cancelHolding() {
            clearTimeout(this.__timer);
            if (this.holdingAt) {
                this.holdingAt = 0;
                this.blocked = false;
            }
        },

    }

};
</script>

<style scoped>
.Btn {
    --outline-color: var(--color-base-2);

    position: relative;
    z-index: 1;
    -webkit-appearance: none;
    margin: 0;
    padding: 0 var(--sp2);
    user-select: none;
    line-height: var(--input-size);
    height: var(--input-size);
    box-sizing: border-box;
    gap: var(--sp);
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: var(--border-radius);
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;

    font: inherit;
}

.Btn:focus {
    --outline-color: var(--color-primary);
    outline: 2px solid var(--color-focus-1);
    z-index: 10;
}

.Label {
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.Icon {
    min-width: var(--sp);
    display: flex;
    align-items: center;
    justify-content: center;
}

.Btn-large {
    --input-size: var(--input-size-large);
    font-size: var(--font-size-large);
}

.Btn-small {
    --input-size: var(--input-size-small);
    font-size: var(--font-size-small);
    padding: 0 var(--sp);
    gap: var(--sphalf);
}

.Btn-small .Icon {
    font-size: var(--font-size-small);
}

.Btn-square {
    padding-left: 0;
    padding-right: 0;
    width: var(--input-size);
    justify-content: center;
}

.Btn-round {
    border-radius: 1000px;
}

.Btn-outline {
    border: 1px solid var(--outline-color);
}

.Btn-disabled {
    opacity: .5;
    cursor: not-allowed;
}

.Btn-base {
    background: var(--color-base-0);
}

.Btn-default {
    --outline-color: var(--color-base-2);
    background: var(--color-base-1);
    border: 1px solid var(--outline-color);
}

.Btn-primary {
    --outline-color: var(--color-primary);
    background: var(--color-primary);
    color: var(--color-primary-text);
}

.Btn-primary-text {
    color: var(--color-primary);
}

.Btn-primary-outline {
    --outline-color: var(--color-primary);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    background: var(--color-base-0);
}

.Btn-danger {
    --outline-color: var(--color-danger);
    background: var(--color-danger);
    color: var(--color-danger-text);
}

.Btn-danger-text {
    color: var(--color-danger);
}

.Btn-danger-outline {
    --outline-color: var(--color-danger);
    color: var(--color-danger);
    border: 1px solid var(--color-danger);
    background: var(--color-base-0);
}

.Btn-danger-outline:hover {
    background: var(--color-base-1);
}

.HoldingIcon {
    margin-left: -8px;
}
</style>
