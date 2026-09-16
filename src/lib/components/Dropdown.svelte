<script lang="ts">
    import Frame from './Frame.svelte';
    import Stack from './layout/Stack.svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLElement> & {
        menu?: string[];
        align?: 'center' | 'left' | 'right';
        eventAction?: (value: string) => void;
        id?: string;
    };

    let {
        menu = [],
        align = 'center',
        eventAction,
        id = 'mainpopover',
        children
    }: Props = $props();

    let mainpopover: HTMLElement | null = $state(null);

    function handleClick(action: string) {
        if (eventAction) eventAction(action);
        if (mainpopover) mainpopover.hidePopover();
    }
</script>

{#if children}
    {@render children()}
{/if}

<div
    bind:this={mainpopover}
    class={`frame frame-${align}`}
    popover="auto"
    {id}
    style={`
        justify-content: ${align};
    `}
>
    <Frame
        border={true}
        transparent={true}
        style="padding: 1px; border-radius: calc(var(--corner-radius) / 2);"
    >
        <Stack gap="zero">
            {#each menu as item}
                <button class="dropdown-item" onclick={() => handleClick(item)}>
                    {item}
                </button>
            {/each}
        </Stack>
    </Frame>
</div>

<style>
    .frame {
        position-anchor: auto;
        top: anchor(bottom);
        left: anchor(center);
        justify-self: anchor-center;
        translate: -50% var(--size-xs);
        border: none;
        background: transparent;
        padding: 0;
        width: fit-content;
        min-width: 5vw;
        margin: 0;
        filter: drop-shadow(0px 2px var(--size-xs) rgba(0, 0, 0, 0.15));
        transition:
            opacity 120ms ease,
            transform 120ms ease;
    }

    @starting-style {
        .frame {
            opacity: 0;
            transform: translateY(calc(-1 * var(--size-xs)));
        }
    }

    .frame:popover-open {
        display: flex;
        flex-direction: column;
    }

    .dropdown-item {
        padding: var(--size-xs) var(--size-md);
        text-align: left;
        color: var(--color-fg-low);
        border-radius: calc(var(--corner-radius) / 2);
    }

    .dropdown-item:hover {
        background-color: var(--color-bg-hover);
    }

    .frame-center {
        left: anchor(center);
        translate: -50% var(--size-xs);
    }

    .frame-left {
        left: anchor(left);
    }

    .frame-right {
        left: anchor(right);
        translate: -100% var(--size-xs);
    }
</style>
