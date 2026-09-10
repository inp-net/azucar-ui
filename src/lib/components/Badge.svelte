<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Component } from 'svelte';

    // --- Badge ---
    // A simple badge component for displaying small pieces of information.

    type Props = HTMLAttributes<HTMLDivElement> & {
        variant?: 'default' | 'outline' | 'ghost';
        icon?: Component;
    };

    const { variant = 'default', icon, class: className, children, ...rest }: Props = $props();

    const iconSize = '0.9em';

    const classes = $derived(['badge', `badge-${variant}`, className].join(' '));
</script>

<div class={classes} {...rest}>
    {#if icon}
        <!-- making a container fixed size reduce overhead, no need to add size
             parameters to svg -->
        {@const IconComponent = icon}
        <div
            class="icon-container"
            style={`
                --icon-size: ${iconSize};
            `}
        >
            <IconComponent class="icon" aria-hidden="true" />
        </div>
    {/if}
    {@render children?.()}
</div>

<style>
    .badge {
        display: inline-flex;
        flex-wrap: nowrap;
        align-items: center;
        padding: var(--size-xxs) var(--size-sm);
        font-size: var(--size-md);
        color: var(--color-fg-solid);
        border-radius: var(--corner-radius);
        gap: var(--size-xs);
    }

    .badge-default {
        background-color: var(--color-bg-solid);
    }

    .badge-outline {
        color: var(--color-fg-low);
        background-color: var(--color-bg);
        box-shadow: inset 0 0 0 1px var(--color-border);
    }

    .badge-ghost {
        color: var(--color-fg-low);
    }

    .icon-container {
        height: var(--icon-size);
        width: max-content;
    }

    :global(.icon-container > svg) {
        position: relative;
        top: -1px;
        width: 100%;
        height: 100%;
    }
</style>
