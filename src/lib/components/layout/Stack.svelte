<script lang="ts">
    import Flex from './Flex.svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Size } from '$lib/types.js';
    import type * as CSS from 'csstype';

    // --- Stack ---
    // A simple layout component that stacks its children vertically with configurable gap and alignment.

    type Props = HTMLAttributes<HTMLElement> & {
        gap?: Size;
        align?: CSS.Properties['alignItems'];
    };

    let { gap = 'md', align = 'stretch', children, ...rest }: Props = $props();
</script>

<Flex direction="column" {gap} {align} {...rest}>
    {@render children?.()}
</Flex>
