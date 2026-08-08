<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import type * as CSS from 'csstype';

    // --- Skeleton ---
    // A simple skeleton loader component that can be used to indicate loading state for various UI elements. It can be customized with width, height, and border-radius.

    type Props = HTMLAttributes<HTMLDivElement> & {
        width?: CSS.Properties['width'];
        height?: CSS.Properties['height'];
        borderRadius?: CSS.Properties['borderRadius'];
        style?: string;
    };

    let {
        children,
        class: className,
        width = '100%',
        height = '1em',
        borderRadius = 'var(--corner-radius)',
        style: styleProp,
        ...rest
    }: Props = $props();
</script>

<div
    class={`skeleton neutral ${className || ''}`}
    style={`width: ${width}; height: ${height}; border-radius: ${borderRadius}${styleProp ? `; ${styleProp}` : ''};`}
    {...rest}
>
    {@render children?.()}
</div>

<style>
    .skeleton {
        background-color: var(--color-bg-active);
        animation: pulse 1.5s infinite;
    }
</style>
