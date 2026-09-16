<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Snippet } from 'svelte';
    import Flex from './layout/Flex.svelte';
    import { Stack } from '$lib/index.ts';

    type Props = HTMLAttributes<HTMLElement> & {
        tabs: string[];
        selected?: number;
        content?: Snippet<[number]>;
    };

    let { content, class: className, tabs = [], selected = $bindable(), ...rest }: Props = $props();

    selected = selected ?? 0;
</script>

<Flex {...rest} class={className} gap="zero">
    {#each tabs as tab, $index}
        <Stack gap="xs" class="tabs-item">
            <button
                class="tabs-button"
                class:selected={selected === $index}
                onclick={() => (selected = $index)}
            >
                {tab}
            </button>
            <hr class="tabs-button-underline" class:selected={selected === $index} />
        </Stack>
    {/each}
</Flex>

{@render content?.(selected ?? 0)}

<style>
    :global(.tabs-item) {
        flex: 1;
    }

    .tabs-button {
        width: 100%;
        color: var(--color-fg-low);
        text-align: center;
        font-weight: bold;
        padding: var(--padding-y-icon) var(--size-md);
    }

    .tabs-button.selected {
        color: var(--color-fg-high);
    }

    .tabs-button:hover {
        color: var(--color-fg-high);
        background-color: var(--color-bg-subtle);
    }

    .tabs-button-underline {
        border: none;
        height: 2px;
        background-color: var(--color-border-subtle);
    }

    .tabs-button-underline.selected {
        background-color: var(--color-fg-high);
    }
</style>
