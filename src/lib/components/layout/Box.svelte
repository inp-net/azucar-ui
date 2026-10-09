<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Size } from '#lib/types.ts';
    import type * as CSS from 'csstype';

    // --- Box ---
    // A simple wrapper component that applies padding, margin, width, height, and display styles

    type Props = HTMLAttributes<HTMLElement> & {
        as?: keyof HTMLElementTagNameMap;
        padding?: Size;
        margin?: Size;
        width?: CSS.Properties['width'];
        height?: CSS.Properties['height'];
        display?: CSS.Properties['display'];
    };

    let {
        as = 'div',
        padding,
        margin,
        width,
        height,
        display,
        style,
        children,
        ...rest
    }: Props = $props();
</script>

<svelte:element
    this={as}
    style={`
		${padding ? `padding: var(--size-${padding});` : ''}
		${margin ? `margin: var(--size-${margin});` : ''}
		${width ? `width:${width};` : ''}
		${height ? `height:${height};` : ''}
		${display ? `display:${display};` : ''}
		${style ?? ''}
	`}
    {...rest}
>
    {@render children?.()}
</svelte:element>
