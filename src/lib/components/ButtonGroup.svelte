<script lang="ts">
    import type { Snippet } from 'svelte';
    import Flex from './layout/Flex.svelte';

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<Flex class="button-group" gap="xs" wrap={false}>
    {@render children?.()}
</Flex>

<style>
    /* first (= */
    :global(.button-group :first-child) {
        border-top-left-radius: var(--corner-radius);
        border-bottom-left-radius: var(--corner-radius);
        border-top-right-radius: var(--corner-radius-sm);
        border-bottom-right-radius: var(--corner-radius-sm);
    }

    /* middle == */
    :global(.button-group :not(:first-child):not(:last-child)) {
        border-radius: var(--corner-radius-sm);
    }

    /* last =) */
    :global(.button-group :last-child) {
        border-top-left-radius: var(--corner-radius-sm);
        border-bottom-left-radius: var(--corner-radius-sm);
        border-top-right-radius: var(--corner-radius);
        border-bottom-right-radius: var(--corner-radius);
    }

    /* make the button take all the space if not in flexbox */
    :global(.button-group > *) {
        flex: 1;
    }
</style>
