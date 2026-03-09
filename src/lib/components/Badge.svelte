<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    // --- Badge ---
    // A simple badge component for displaying small pieces of information.

    type Props = HTMLAttributes<HTMLDivElement> & {
        variant?: 'default' | 'outline' | 'ghost';
    };

    const { variant = 'default', class: className, children, ...rest }: Props = $props();

    const classes = $derived(['badge', `badge-${variant}`, className].join(' '));
</script>

<div class={classes} {...rest}>
    {@render children?.()}
</div>

<style>
    .badge {
        display: inline-flex;
        align-items: center;
        padding: var(--size-xs) var(--size-sm);
        font-size: var(--size-md);
        color: var(--color-fg-high);
        border-radius: var(--corner-radius);
    }

    .badge-default {
        background-color: var(--color-bg-solid);
    }

    .badge-outline {
        color: var(--color-fg-low);
        background-color: var(--color-bg);
        outline-color: var(--color-border);
        outline-width: var(--size-xs);
        outline-style: auto;
    }

    .badge-ghost {
        color: var(--color-fg-low);
    }
</style>
