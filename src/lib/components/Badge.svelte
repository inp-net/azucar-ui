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
        padding: var(--size-xxs) var(--size-sm);
        font-size: var(--size-md);
        color: var(--color-fg-solid);
        border-radius: var(--corner-radius);
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
