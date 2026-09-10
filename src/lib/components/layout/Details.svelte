<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { ChevronDown } from '@lucide/svelte';
    import type { Snippet } from 'svelte';
    import Frame from '../Frame.svelte';
    import Flex from './Flex.svelte';

    type Props = HTMLAttributes<HTMLElement> & {
        summary?: string;
        summarySnippet?: Snippet;
        framed?: boolean;
        transparent?: boolean;
        shadow?: boolean;
        border?: boolean;
        isUnfolded?: boolean;
    }

    let {
        summary = '',
        summarySnippet,
        framed = false,
        transparent = false,
        shadow = false,
        border = false,
        isUnfolded = $bindable(false),
        children,
        ...rest
    }: Props = $props();

    const arrowSize = "1.1em";
    const resetStyle = $derived(!framed ? 'background-color: transparent; border-color: none; box-shadow: none;' : '');
    const styles = $derived(
        [rest.style, resetStyle, 'padding: 0;'].filter(Boolean).join(' ')
    );
</script>

<Frame 
    transparent={framed && transparent}
    shadow={framed && shadow}
    border={framed && border}
    style={styles}
>
    <details open={isUnfolded} >
        <summary style={`
            ${framed ? 'padding: var(--size-md) var(--size-lg);' : 'padding: var(--size-md) 0;'}
        `}>
            <Flex gap="sm" align="center" wrap={false}>
                <ChevronDown size={arrowSize} class="arrow" />
                {#if !summarySnippet}
                    <p class="summary-text">{summary}</p>
                {:else}
                    {@render summarySnippet()}
                {/if}
            </Flex>
        </summary>
        <div class="content" style={`
            ${framed ? 'padding: 0 var(--size-lg) var(--size-md) var(--size-lg);' : 'padding: 0;'}
        `}>
            <hr noshade/>
            {@render children?.()}
        </div>
    </details>
</Frame>

<style>
    .content {
        padding: 0 var(--size-lg) var(--size-md) var(--size-lg);
    }

    :global(details .arrow) {
        transition: transform 0.15s ease;
    }

    :global(details[open] .arrow) {
        transform: rotate(180deg);
    }

    hr {
        margin: 0 var(--size-xxs) var(--size-md) var(--size-xxs);
        color: var(--color-fg-high);
        border-color: var(--color-border);
        background-color: var(--color-fg-high);
        border-bottom: 0;
    }

    .summary-text {
        font-family: Space Grotesk, sans-serif;
        font-weight: 700;
    }

</style>
