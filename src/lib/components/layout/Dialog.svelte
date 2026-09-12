<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLDialogAttributes } from 'svelte/elements';
    import Frame from '../Frame.svelte';

    // --- Dialog ---
    // A dialog component that can be used to display modal content.

    type Props = HTMLDialogAttributes & {
        children: Snippet;
        blocking?: boolean;
    };

    let { children, blocking = false, ...rest }: Props = $props();
</script>

<dialog {...rest}>
    <Frame shadow transparent>
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
</style>
