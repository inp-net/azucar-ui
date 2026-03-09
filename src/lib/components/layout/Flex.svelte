<script lang="ts">
    import Box from './Box.svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Size } from '$lib/types.js';
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
    };

    let {
        margin,
        padding,
        direction = 'row',
        align = 'stretch',
        justify = 'flex-start',
        gap = 'md',
        wrap = false,
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
		justify-content:${justify};
		${gap ? `gap:var(--size-${gap});` : ''}
		flex-wrap:${wrap ? 'wrap' : 'nowrap'};
		${style ?? ''}
	`}
    {...rest}
>
    {@render children?.()}
</Box>
