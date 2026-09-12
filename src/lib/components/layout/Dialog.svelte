<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLDialogAttributes } from 'svelte/elements';
    import Frame from '../Frame.svelte';

    // --- Dialog ---
    // A dialog component that can be used to display modal content.

    type Props = HTMLDialogAttributes & {
        children: Snippet;
    };

    let { children, ...rest }: Props = $props();
</script>

<dialog popover="auto" {...rest}>
    <Frame shadow>
        {@render children?.()}
    </Frame>
</dialog>

<style>
    dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    dialog::backdrop {
        background-color: color-mix(in oklch, var(--color-bg-subtle) 75%, transparent);
        backdrop-filter: blur(var(--size-xxs));
    }
</style>
