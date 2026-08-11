<script lang="ts">
    import Box from './Box.svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Size } from '$lib/types.ts';
    import type * as CSS from 'csstype';

    // --- Flex ---
    // A flexible box layout component that extends Box and applies flexbox styles based on props.

    type Props = HTMLAttributes<HTMLElement> & {
        margin?: Size;
        padding?: Size;
        direction?: CSS.Properties['flexDirection'];
        align?: CSS.Properties['alignItems'];
        justify?: CSS.Properties['justifyContent'];
        gap?: Size;
        wrap?: boolean;
        scrollable?: boolean;
    };

    let {
        margin,
        padding,
        direction = 'row',
        align = 'stretch',
        justify = 'flex-start',
        gap = 'md',
        wrap = true,
        scrollable = false,
        style,
        children,
        ...rest
    }: Props = $props();
</script>

<Box
    display="flex"
    style={`
    	${padding ? `padding: var(--size-${padding});` : ''}
		${margin ? `margin: var(--size-${margin});` : ''}
		flex-direction:${direction};
		align-items:${align};
        max-width: 100%;
        min-width: 0;
		justify-content:${justify};
		${gap ? `gap:var(--size-${gap});` : ''}
		flex-wrap:${wrap ? 'wrap' : 'nowrap'};
        ${scrollable ? 'flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden; white-space: nowrap; width: 100%; scrollbar-width: thin; -webkit-overflow-scrolling: touch;' : ''}
		${style ?? ''};
	`}
    {...rest}
>
    {@render children?.()}
</Box>
