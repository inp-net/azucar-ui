<script lang="ts">
    // --- Avatar ---
    // A simple avatar component that displays a user's profile picture or initials.

    type Props = {
        src?: string;
        alt: string;
        size?: 'small' | 'large';
    };

    const { src, alt = 'Avatar', size = 'small' }: Props = $props();

    const initials = (str: string) =>
        str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .join('');
</script>

<div class={`avatar avatar-${size}`}>
    {#if src}
        <img {src} {alt} />
    {:else}
        <span class="initials">{initials(alt)}</span>
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

    .avatar-small {
        width: var(--size-xl);
        height: var(--size-xl);
    }

    .avatar-large {
        width: var(--size-xxl);
        height: var(--size-xxl);
        font-size: var(--size-lg);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
