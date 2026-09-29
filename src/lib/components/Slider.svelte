<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';

    // --- Slider ---
    // A simple range input.

    type Props = HTMLInputAttributes & {
        type?: 'range';
        min?: number;
        max?: number;
        step?: number;
    };

    let {
        children,
        value = $bindable(0),
        min = 0,
        max = 100,
        step = 1,
        class: className,
        ...rest
    }: Props = $props();
</script>

<label class={['slider-root', children && 'has-label', className]}>
    {#if children}
        <span class="label">
            {@render children?.()}
        </span>
    {/if}

    <input type="range" bind:value {min} {max} {step} {...rest} />
</label>

<style>
    .slider-root {
        --slider-width: 100%;
        --slider-height: 8px;
        --slider-container-height: 20px;
        --slider-thumb-height: 16px;
        --slider-thumb-width: 22px;
        --slider-background: var(--color-bg-solid);
        --slider-background-hover: var(--color-bg-solid-hover);

        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--size-xs);
        width: var(--slider-width);
        height: var(--slider-container-height);
        cursor: pointer;
    }

    .slider-root.has-label {
        width: auto;
    }

    input[type='range'] {
        appearance: none;
        width: var(--slider-width);
        height: var(--slider-height);
        margin: 0;
        cursor: pointer;
        border-radius: var(--corner-radius);
        box-shadow: var(--shadow-surface);

        /* Track fill */
        background: var(--slider-background);
    }

    input[type='range']:hover:not(:disabled) {
        background: var(--slider-background-hover);
    }

    input[type='range']:focus-visible {
        outline: 2px solid var(--color-border-focus);
        outline-offset: 2px;
    }

    /* Thumb */
    input[type='range']::-webkit-slider-thumb {
        appearance: none;
        height: var(--slider-thumb-height);
        width: var(--slider-thumb-width);
        background: var(--color-fg-solid);
        border-radius: var(--corner-radius);
        box-shadow: var(--shadow-surface);
    }

    input[type='range']::-moz-range-thumb {
        height: var(--slider-thumb-height);
        width: var(--slider-thumb-width);
        background: var(--color-fg-solid);
        border: none;
        border-radius: var(--corner-radius);
        box-shadow: var(--shadow-surface);
    }

    input[type='range']:active:not(:disabled)::-webkit-slider-thumb {
        width: calc(var(--slider-thumb-width) + 2px);
    }

    input[type='range']:active:not(:disabled)::-moz-range-thumb {
        width: calc(var(--slider-thumb-width) + 2px);
    }

    .label {
        user-select: none;
    }

    input[type='range']:disabled {
        background: var(--color-bg);
        cursor: not-allowed;
    }

    input[type='range']:disabled::-webkit-slider-thumb {
        background-color: var(--color-border-subtle);
    }

    input[type='range']:disabled::-moz-range-thumb {
        background-color: var(--color-border-subtle);
    }

    .slider-root:has(input:disabled) .label {
        color: var(--color-border-subtle);
        cursor: not-allowed;
    }
</style>
