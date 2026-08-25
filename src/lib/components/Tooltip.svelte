<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLElement> & {
        text: string;
        position?: 'top' | 'bottom' | 'left' | 'right';
    };

    let { children, text, class: className, position = 'top', ...rest }: Props = $props();
</script>

<div class="tooltip-wrapper" {...rest}>
    <span class="tooltip-trigger" role="button" tabindex={children ? 0 : undefined}>
        {@render children?.()}
    </span>

    <span class={`tooltip-bubble tooltip-${position} ${className || ''}`} role="tooltip">
        {text}
    </span>
</div>

<style>
    .tooltip-wrapper {
        position: relative;
        display: inline-flex;
        width: fit-content;
    }

    .tooltip-trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .tooltip-bubble {
        display: none;
        transition-behavior: allow-discrete;
        position: absolute;
        z-index: 1000;
        width: max-content;
        max-width: 12rem; /* arbitrary, it looks good */
        text-align: center;
        padding: var(--size-xs) var(--size-sm);
        border-radius: var(--corner-radius);
        color: var(--color-fg-high);
        background: var(--color-bg);
        opacity: 0;
        pointer-events: none;
        transform: translateY(0.25rem);
        transition:
            opacity 120ms ease,
            transform 120ms ease;
        visibility: hidden;
        white-space: normal;
        overflow-wrap: anywhere;
    }

    .tooltip-wrapper:hover .tooltip-bubble,
    .tooltip-wrapper:focus-within .tooltip-bubble {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
        display: inline-block;
    }

    .tooltip-top {
        bottom: calc(100% + 0.5rem);
        left: 50%;
        transform: translate(-50%, 0.25rem);
    }

    .tooltip-bottom {
        top: calc(100% + 0.5rem);
        left: 50%;
        transform: translate(-50%, 0.25rem);
    }

    .tooltip-left {
        right: calc(100% + 0.5rem);
        top: 50%;
        transform: translate(0.25rem, -50%);
    }

    .tooltip-right {
        left: calc(100% + 0.5rem);
        top: 50%;
        transform: translate(0.25rem, -50%);
    }

    /* for the small sliding animation */
    .tooltip-wrapper:hover .tooltip-top,
    .tooltip-wrapper:focus-within .tooltip-top,
    .tooltip-wrapper:hover .tooltip-bottom,
    .tooltip-wrapper:focus-within .tooltip-bottom {
        transform: translate(-50%, 0);
    }

    .tooltip-wrapper:hover .tooltip-left,
    .tooltip-wrapper:focus-within .tooltip-left,
    .tooltip-wrapper:hover .tooltip-right,
    .tooltip-wrapper:focus-within .tooltip-right {
        transform: translate(0, -50%);
    }

    @starting-style {
        .tooltip-wrapper:hover .tooltip-top,
        .tooltip-wrapper:focus-within .tooltip-top,
        .tooltip-wrapper:hover .tooltip-bottom,
        .tooltip-wrapper:focus-within .tooltip-bottom {
            opacity: 0;
            transform: translate(-50%, 0.25rem);
        }

        .tooltip-wrapper:hover .tooltip-left,
        .tooltip-wrapper:focus-within .tooltip-left,
        .tooltip-wrapper:hover .tooltip-right,
        .tooltip-wrapper:focus-within .tooltip-right {
            opacity: 0;
            transform: translate(0.25rem, -50%);
        }
    }
</style>
