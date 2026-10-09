<script lang="ts">
    import type { Size } from '#lib/types.ts';
    import type { HTMLAttributes } from 'svelte/elements';

    // --- Avatar ---
    // A simple avatar component that displays a user's profile picture or initials.

    type Props = HTMLAttributes<HTMLDivElement> & {
        src?: string;
        alt: string;
        size?: Size;
        initials?: string;
    };

    const {
        src,
        alt = 'Avatar',
        size = 'sm',
        initials,
        class: className,
        ...rest
    }: Props = $props();

    const initialsLimit = 4;

    const getInitials = (str: string) =>
        str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .slice(0, initialsLimit)
            .join('');
</script>

<div
    class={`avatar ${className || ''}`}
    style={`
        width: var(--size-${size});
        height: var(--size-${size});
        font-size: calc(var(--size-${size}) / ${Math.PI});
    `}
    {...rest}
>
    {#if src}
        <img {src} {alt} />
    {:else}
        <span class="initials">{initials || getInitials(alt)}</span>
    {/if}
</div>

<style>
    .avatar {
        aspect-ratio: 1 / 1;
        border-radius: var(--corner-radius-full);
        overflow: hidden;
        background-color: var(--color-bg-solid);
    }

    .initials {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-fg-solid);
        font-weight: bold;
        height: 100%;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
