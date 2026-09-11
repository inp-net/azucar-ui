<script lang="ts">
    import type { HTMLSelectAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import { ChevronDown } from '@lucide/svelte';

    // --- Select ---
    // Select is an Input where you choose between a selection.
    // Style follow the Button component

    type Props = HTMLSelectAttributes & {
        variant?: 'default' | 'outline';
        options?: string[];
        value?: string;
        disabled?: boolean;
        children?: Snippet;
    };

    let {
        id = '',
        variant = 'default',
        options = [],
        value = $bindable(),
        disabled = false,
        required,
        children,
        ...restProps
    }: Props = $props();
</script>

<label class="select-label" for={id}>
    {#if children}
        <span>
            {@render children?.()}
            {#if required}
                <!-- The little red star indicating required field -->
                <span class="required-star" aria-hidden="true">*</span>
            {/if}
        </span>
    {/if}
    <div class="select-container select-{variant}">
        <select class="select" bind:value {disabled} {required} {id} {...restProps}>
            {#each options as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
        <div class="arrow" aria-hidden="true">
            <ChevronDown size="1.1em" />
        </div>
    </div>
</label>

<style>
    .select-label {
        display: inline-flex;
        flex-direction: column;
        gap: var(--size-xxs);
    }

    .select-container {
        position: relative;
        display: flex;
        align-items: center;
        border-radius: var(--corner-radius);
        width: 100%;
    }

    .select {
        padding: var(--padding-y-icon) var(--size-xl) var(--padding-y-icon) var(--size-md);
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .select-default {
        color: var(--color-fg-solid);
        background: linear-gradient(
            in oklch to bottom,
            var(--color-bg-solid),
            var(--color-bg-solid-hover)
        );
        box-shadow: var(--shadow-surface);
    }

    .select-default:hover:not(:disabled) {
        background: linear-gradient(
            in oklch to bottom,
            var(--color-bg-solid-hover),
            var(--color-bg-solid-hover)
        );
    }

    .select-outline {
        color: var(--color-fg-low);
        background-color: var(--color-bg);
        box-shadow:
            0 0 0 1px var(--color-border) inset,
            var(--shadow-surface);
    }

    .select-outline:hover:not(:disabled) {
        background-color: var(--color-bg-hover);
    }

    .select-outline:active:not(:disabled) {
        color: var(--color-fg-low);
        background-color: var(--color-bg-active);
        box-shadow:
            0 0 0 1px var(--color-border-focus) inset,
            var(--shadow-surface);
    }

    .arrow {
        position: absolute;
        right: 0.75em;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: currentColor;
        pointer-events: none;
    }

    .required-star {
        color: var(--color-danger);
    }
</style>
