<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import type * as CSS from 'csstype';
    import Skeleton from './Skeleton.svelte';

    // --- SkeletonText ---
    // A text-specific skeleton loader that mirrors the surrounding typography.
    // It inherits the parent font size and can render multiple lines.

    type Props = HTMLAttributes<HTMLDivElement> & {
        lines?: number;
        width?: CSS.Properties['width'];
        borderRadius?: CSS.Properties['borderRadius'];
    };

    let { class: className, lines = 3, width, ...rest }: Props = $props();
    let randomWidth = () => `${Math.floor(Math.random() * 50) + 50}%`; // Random width between 50% and 100%
</script>

<div class={`skeleton-text ${className || ''}`} {...rest}>
    {#each Array.from({ length: Math.max(1, lines) }) as _}
        <Skeleton
            width={width || randomWidth()}
            style="font-size: inherit; line-height: inherit;"
        />
    {/each}
</div>

<style>
    .skeleton-text {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        width: 100%;
        max-width: 100%;
    }
</style>
