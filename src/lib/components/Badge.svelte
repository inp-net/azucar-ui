<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Component } from 'svelte';
    import IconWrapper from '$lib/internal/IconWrapper.svelte';

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
        <IconWrapper {icon} size={iconSize} />
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
</style>
