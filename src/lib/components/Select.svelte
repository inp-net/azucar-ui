<script lang="ts">
    import type { HTMLSelectAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import { ChevronDown } from '@lucide/svelte';
    import RequiredStar from '$lib/internal/RequiredStar.svelte';

    // --- Select ---
    // Select is an Input where you choose between a selection.
    // Style follow the TextInput component.

    type Props = HTMLSelectAttributes & {
        options?: string[];
        value?: string;
        children?: Snippet;
    };

    let { id = '', options = [], value = $bindable(), children, ...rest }: Props = $props();
</script>

<label class="select-label" for={id}>
    {#if children}
        <span>
            {@render children?.()}
            {#if rest.required}
                <RequiredStar />
            {/if}
        </span>
    {/if}
    <div class="select-container">
        <select class="select" bind:value {id} {...rest}>
            {#each options as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
        <span class="arrow" aria-hidden="true">
            <ChevronDown size="1.1em" />
        </span>
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
        color: var(--color-fg-low);
        background-color: var(--color-bg);
        box-shadow:
            0 0 0 1px var(--color-border) inset,
            var(--shadow-surface);
    }

    .select {
        padding: var(--padding-y-icon) var(--size-xl) var(--padding-y-icon) var(--size-md);
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .select-container:hover:has(> .select:not(:disabled)) {
        background-color: var(--color-bg-hover);
    }

    .select-container:active:has(> .select:not(:disabled)) {
        background-color: var(--color-bg-active);
        box-shadow:
            0 0 0 1px var(--color-border-focus) inset,
            var(--shadow-surface);
    }

    .select-label:has(select:disabled) {
        --base-color: var(--color-neutral);
        color: var(--color-border);
        cursor: not-allowed;
    }

    .select-container:has(> .select:disabled) {
        color: var(--color-border);
    }

    .select:disabled {
        cursor: not-allowed;
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
</style>
