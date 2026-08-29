<script lang="ts">
    import { slide } from 'svelte/transition';
    import type { HTMLAttributes } from 'svelte/elements';
    import { ChevronDown } from '@lucide/svelte';
    import Frame from '../Frame.svelte';
    import Flex from './Flex.svelte';

    type Props = HTMLAttributes<HTMLElement> & {
        summary?: string;
        transparent?: boolean;
        shadow?: boolean;
        border?: boolean;
        isUnfolded?: boolean;
    }

    let {
        summary = '',
        transparent = false,
        shadow = false,
        border = false,
        isUnfolded = $bindable(false),
        children,
        ...rest
    }: Props = $props();

    let unfolded = $state(false);

    const arrowSize = "1.1em";
</script>

<Frame {transparent} {shadow} {border} {...rest}>
    <details open={isUnfolded}>
        <summary onclick={toggle}>
            <Flex gap="sm" align="center">
                <ChevronDown size={arrowSize} class="arrow" />
                <p>{summary}</p>
            </Flex>
        </summary>
        <hr noshade/>
        {@render children?.()}
    </details>
</Frame>

<style>
    /* remove official arrow from details */
    summary {
        list-style: none;
        cursor: pointer;
        
        /* text style */
        font-family: Space Grotesk, sans-serif;
        font-weight: 700;
    }
    summary::-webkit-details-marker {
        display: none;
    }
    summary::marker {
        display: none;
    }

    :global(details .arrow) {
        transition: transform 0.15s ease;
    }

    :global(details[open] .arrow) {
        transform: rotate(180deg);
    }

    hr {
        margin: var(--size-sm) var(--size-xxs) var(--size-md) var(--size-xxs);
        color: var(--color-fg-high);
        border-color: var(--color-border);
        background-color: var(--color-fg-high);
        border-bottom: 0;
    }

</style>
