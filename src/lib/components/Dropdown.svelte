<script lang="ts">
    import Frame from './Frame.svelte';
    import Button from './Button.svelte';
    import Stack from './layout/Stack.svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLElement> & {
        menu?: string[];
        align?: 'center' | 'left' | 'right';
        eventAction: (string) => void;
    };

    let {
        menu = [],
        align = 'center',
        eventAction,
        children,
        ...rest
    }: Props = $props();
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleWindowKeydown} />

<div class='frame' style={`justify-content: ${align}; align-items: ${align}`}>
    <svg
        class='arrow'
        width="12mm"
        height="13.63mm"
        viewBox="0 0 12 13.63"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g transform="translate(-64.000001, -98.373518)">
            <path
                style="fill: var(--color-border);"
                d="M 70.000003,98.373512 64.000001,110 h 12.000001 z"
            />
            <path
                style="fill: var(--color-bg-subtle);"
                d="M 70.000002,99.999997 65.000001,110 v 2 H 75.000002 L 75,110 Z"
            />
        </g>
    </svg>


    <Frame border={true} style="padding: var(--size-xxs);">
        <Stack gap='zero'>
            {#each menu as item}
                <Button variant='ghost'>
                    <span style={`text-align: ${align}; width: 100%;`}>{item}</span>
                </Button>
            {/each}
        </Stack>
    </Frame>
</div>

<style>
    .frame {
        display: flex;
        flex-direction: column;
        width: fit-content;
        min-width: 5vw;
    }

    .arrow {
        position: relative;
        top: 2px;
        width: var(--size-lg);
        height: var(--size-sm);
        margin: 0 var(--size-md);
        /* fill: var(--color-bg-subtle); */
        /* stroke: var(--color-border); */
        /* stroke-width: 2px; */
    }
</style>
