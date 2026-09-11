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
        children,
        ...rest
    }: Props = $props();

    let flexName = (s: string) => {
        if (s === 'center') {
            return 'center'
        } else if (s === 'left') {
            return 'flex-start';
        } else {
            return 'flex-end';
        }
    };

    let mainpopover: HTMLElement | null = $state(null);

    function handleClick(action: string) {
        if (eventAction)
            eventAction(action);

        if (mainpopover)
            mainpopover.hidePopover();
    };
</script>

<!-- <svelte:window onclick={handlePopoverClick} /> -->

<button popovertarget={id} popovertargetaction="toggle" style="anchor-name: --anchor-{id};">
    {#if children}
        {@render children()}
    {/if}
</button>

<div 
    bind:this={mainpopover}
    class='frame' 
    popover="auto" 
    {id} 
    style={`
        justify-content: ${align};
        align-items: ${flexName(align)};
        position-anchor: --anchor-${id};
    `}
>
    <svg
        class='arrow'
        width="12mm"
        height="13.63mm"
        viewBox="0 0 12 13.63"
    >
        <g transform="translate(-64.000001, -98.373518)">
            <path
                style="fill: var(--color-border);"
                d="M 70.000003,98.373512 64.000001,110 h 12.000001 z"
            />
            <path
                style="fill: var(--color-bg-subtle);"
                d="M 70.000002,101 65,111 v 2 H 75.000002 L 75,110 Z"
            />
        </g>
    </svg>

    <Frame border={true} style="padding: 1px; border-radius: calc(var(--corner-radius) / 2);">
        <Stack gap='zero'>
            {#each menu as item}
                <button class='dropdown-item' onclick={() => handleClick(item)}>
                    {item}
                </button>
            {/each}
        </Stack>
    </Frame>
</div>

<style>
    .frame {
        top: anchor(bottom);
        left: anchor(center);
        translate: -50% 4px;
        border: none;
        background: transparent;
        padding: 0;
        width: fit-content;
        min-width: 5vw;
        margin: 0;
    }

    .frame:popover-open {
        display: flex;
        flex-direction: column;
    }

    .arrow {
        position: relative;
        top: 2px;
        width: var(--size-lg);
        height: var(--size-sm);
        margin: 0 var(--size-sm);
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
</style>
