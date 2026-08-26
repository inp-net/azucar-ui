<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Component } from 'svelte';
    import type { LucideIcon } from '@lucide/svelte';

    // --- Badge ---
    // A simple badge component for displaying small pieces of information.
    // enlargement (px) : change width of icon (useful when icon is more large than tall)
    // top (px) : micro adjustment icon position
    // left (px) : micro adjustement icon position

    type Props = HTMLAttributes<HTMLDivElement> & {
        variant?: 'default' | 'outline' | 'ghost';
        icon?: Component | LucideIcon;
        enlargement?: number;
        top?: number;
        left?: number;
    };

    const { variant = 'default', icon, enlargement = 0, top = 0, left = 0, class: className, children, ...rest }: Props = $props();

    const iconSize = '1.1em';

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
                --icon-top: ${top}px;
                --icon-left: ${left}px;
                --enlargement: ${enlargement}px;
            `}
        >
            <IconComponent size="1em" class="icon" aria-hidden="true" />
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
        width: calc(var(--icon-size) + var(--enlargement));
        height: var(--icon-size);
    }

    :global(.icon-container > svg) {
        position: relative;
        top: var(--icon-top);
        left: var(--icon-left);
        width: 100%;
        height: 100%;
    }
</style>
