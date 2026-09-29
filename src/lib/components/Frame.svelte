<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    // --- Frame ---
    // A simple container with padding, border-radius, and optional shadow and border.

    type Props = HTMLAttributes<HTMLDivElement> & {
        transparent?: boolean;
        shadow?: boolean;
        border?: boolean;
        interactive?: boolean;
    };

    let {
        children,
        class: className,
        transparent = false,
        shadow = false,
        border = false,
        interactive = false,
        ...rest
    }: Props = $props();
</script>

<div
    class={[
        'frame',
        transparent && 'is-transparent',
        shadow && 'has-shadow',
        border && 'has-border',
        interactive && 'is-interactive',
        className
    ]}
    {...rest}
>
    {@render children?.()}
</div>

<style>
    .frame {
        --border-box-shadow: inset 0 0 0 1px;
        --transparent-opacity: 80%;

        border-radius: var(--corner-radius);
        padding: var(--size-md);
        color: var(--color-fg-high);
        max-width: 100%;
        min-width: 0;
    }

    .frame.is-transparent {
        background-color: color-mix(
            in oklch,
            var(--color-bg-subtle) var(--transparent-opacity),
            transparent
        );
        backdrop-filter: blur(var(--size-sm));
    }

    .frame:not(.is-transparent) {
        background-color: var(--color-bg-subtle);
    }

    .frame.has-border {
        box-shadow: var(--border-box-shadow) var(--color-border-subtle);
    }

    .frame.has-border.has-shadow {
        box-shadow:
            var(--border-box-shadow) var(--color-border-subtle),
            var(--shadow-surface);
    }

    .frame.has-shadow {
        box-shadow: var(--shadow-surface);
    }

    .frame.is-interactive {
        cursor: pointer;
    }

    .frame.is-interactive:hover {
        background-color: var(--color-bg);
    }

    .frame.is-interactive.frame.is-transparent:hover {
        background-color: color-mix(
            in oklch,
            var(--color-bg) var(--transparent-opacity),
            transparent
        );
    }

    .frame.is-interactive.has-border:hover {
        box-shadow: var(--border-box-shadow) var(--color-border);
    }

    .frame.is-interactive.has-border.has-shadow:hover {
        box-shadow:
            var(--border-box-shadow) var(--color-border),
            var(--shadow-surface);
    }

    .frame.is-interactive:active {
        background-color: var(--color-bg-hover);
    }

    .frame.is-interactive.frame.is-transparent:active {
        background-color: color-mix(
            in oklch,
            var(--color-bg-hover) var(--transparent-opacity),
            transparent
        );
    }

    .frame.is-interactive.has-border:active {
        box-shadow: var(--border-box-shadow) var(--color-border-focus);
    }

    .frame.is-interactive.has-border.has-shadow:active {
        box-shadow:
            inset 0 0 0 1px var(--color-border-focus),
            var(--shadow-surface);
    }
</style>
