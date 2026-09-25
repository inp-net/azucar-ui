<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { ChevronRightIcon } from '@lucide/svelte';
    import type { Snippet } from 'svelte';
    import Frame from '../Frame.svelte';
    import Flex from './Flex.svelte';

    // --- Details ---
    // A component that displays a summary and can be unfolded to reveal additional content.

    type Props = HTMLAttributes<HTMLElement> & {
        summary?: string;
        summarySnippet?: Snippet;
        inline?: boolean;
        transparent?: boolean;
        shadow?: boolean;
        border?: boolean;
        isOpen?: boolean;
    };

    let {
        summary = '',
        summarySnippet,
        inline = false,
        transparent = false,
        shadow = false,
        border = false,
        isOpen = $bindable(false),
        children,
        ...rest
    }: Props = $props();

    const arrowSize = '1.1em';
</script>

<Frame
    class={`details-frame`}
    transparent={!inline && transparent}
    shadow={!inline && shadow}
    border={!inline && border}
    interactive={!inline}
    {...rest}
>
    <details open={isOpen}>
        <summary class:is-inline={inline}>
            <Flex gap="sm" align="center" wrap={false}>
                <ChevronRightIcon size={arrowSize} class="arrow" />
                {#if !summarySnippet}
                    <p class="summary-text">{summary}</p>
                {:else}
                    {@render summarySnippet()}
                {/if}
            </Flex>
        </summary>
        <div class="content" class:is-inline={inline}>
            <hr />
            {@render children?.()}
        </div>
    </details>
</Frame>

<style>
    :global(.details-frame) {
        padding: 0 !important;
    }

    summary.is-inline {
        padding: var(--size-md) 0;
    }

    summary:not(.is-inline) {
        padding: var(--size-md);
    }

    .content:not(.is-inline) {
        padding: var(--size-md);
        padding-top: 0;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: var(--size-sm);
    }

    :global(details .arrow) {
        transition: transform 0.15s ease;
    }

    :global(details[open] .arrow) {
        transform: rotate(90deg);
    }

    .summary-text {
        font-weight: bold;
    }
</style>
