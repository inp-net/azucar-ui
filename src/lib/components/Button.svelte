<script lang="ts">
    import { LoaderCircleIcon } from '@lucide/svelte';
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
    import type { Component } from 'svelte';
    import IconWrapper from '#lib/internal/IconWrapper.svelte';

    // --- Button ---
    // The button, pillar of interaction.
    // This component can render as either a <button> or an <a> element based on the presence of the 'href' prop.
    // PS: It took hours to get the spacings and alignments right...

    type AnchorProps = Omit<HTMLAnchorAttributes, 'href' | 'type'> & {
        href: HTMLAnchorAttributes['href'];
        type?: never;
        disabled?: HTMLButtonAttributes['disabled'];
    };

    type ButtonProps = Omit<HTMLButtonAttributes, 'type' | 'href'> & {
        type?: HTMLButtonAttributes['type'];
        href?: never;
        disabled?: HTMLButtonAttributes['disabled'];
    };

    type Props = (AnchorProps | ButtonProps) & {
        variant?: 'default' | 'outline' | 'ghost';
        ref?: HTMLElement | null;
        icon?: Component;
        loading?: boolean;
    };

    let {
        variant = 'default',
        type = 'button',
        disabled = false,
        href,
        ref,
        icon,
        loading,
        class: className,
        children,
        ...rest
    }: Props = $props();

    // Makes the icon bigger if there are no children
    const iconSize = $derived(children ? '1em' : '1.25em');
</script>

<svelte:element
    this={href && !disabled ? 'a' : 'button'}
    type={href ? undefined : type}
    href={href && !disabled ? href : undefined}
    {disabled}
    aria-disabled={disabled}
    tabindex={href && disabled ? -1 : undefined}
    bind:this={ref}
    class={[
        'btn',
        `btn-${variant}`,
        icon && 'btn-has-icon',
        !children && 'btn-icon-only',
        loading && 'btn-loading',
        className
    ]}
    {...rest}
>
    {#if icon || loading}
        <IconWrapper icon={loading ? LoaderCircleIcon : icon} size={iconSize} />
    {/if}

    {#if children}
        {@render children()}
    {/if}
</svelte:element>

<style>
    .btn {
        --active-scale-factor: 0.98;
        position: relative;
        display: inline-flex;
        align-items: center;
        border-radius: var(--corner-radius);
        gap: var(--gap-icon);
        padding: var(--padding-y-icon) var(--size-md);
    }

    .btn-has-icon {
        padding-left: var(--padding-x-icon);
        padding-right: var(--size-sm);
    }

    .btn-icon-only {
        padding: var(--padding-y-icon);
        aspect-ratio: 1;
        line-height: 1;
    }

    /* Default variant */
    .btn-default {
        color: var(--color-fg-solid);
        background: linear-gradient(
            in oklch to bottom,
            var(--color-bg-solid),
            var(--color-bg-solid-hover)
        );
        box-shadow: var(--shadow-surface);
    }

    .btn-default:hover:not(:disabled) {
        background: linear-gradient(
            in oklch to bottom,
            var(--color-bg-solid-hover),
            var(--color-bg-solid-hover)
        );
    }

    .btn-default:active:not(:disabled) {
        color: var(--color-fg-solid);
        background: var(--color-bg-solid-active);
        scale: var(--active-scale-factor);
    }

    .btn-default:disabled {
        --base-color: var(--color-neutral);
        color: var(--color-border);
        background: var(--color-bg);
        cursor: not-allowed;
    }

    /* Outline variant */
    .btn-outline {
        color: var(--color-fg-low);
        background-color: var(--color-bg);
        box-shadow:
            0 0 0 1px var(--color-border) inset,
            var(--shadow-surface);
    }

    .btn-outline:hover:not(:disabled) {
        background-color: var(--color-bg-hover);
    }

    .btn-outline:active:not(:disabled) {
        color: var(--color-fg-low);
        background-color: var(--color-bg-active);
        box-shadow:
            0 0 0 1px var(--color-border-focus) inset,
            var(--shadow-surface);
        scale: var(--active-scale-factor);
    }

    .btn-outline:focus-visible:not(:disabled) {
        box-shadow: var(--shadow-surface);
    }

    .btn-outline:disabled {
        --base-color: var(--color-neutral);
        color: var(--color-border-subtle);
        background: var(--color-bg);
        cursor: not-allowed;
    }

    /* Ghost variant */
    .btn-ghost {
        background: none;
        color: var(--color-fg-low);
        font-weight: bold;
    }

    .btn-ghost:hover:not(:disabled) {
        text-decoration: underline;
        color: var(--color-fg-high);
    }

    .btn-ghost:active:not(:disabled) {
        color: var(--color-fg-high);
        scale: var(--active-scale-factor);
    }

    .btn-ghost:disabled {
        --base-color: var(--color-neutral);
        color: var(--color-border-subtle);
        cursor: not-allowed;
    }

    .btn-loading {
        pointer-events: none;
    }
</style>
