<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import type { Component, Snippet } from 'svelte';
    import { XIcon } from '@lucide/svelte';
    import Flex from './layout/Flex.svelte';
    import Frame from './Frame.svelte';
    import Button from './Button.svelte';
    import StatusIcon from '../internal/StatusIcon.svelte';

    type Props = HTMLAttributes<HTMLElement> & {
        closeToast?: () => void;
        variant?: 'default' | 'success' | 'danger' | 'warning';
        children?: Snippet;
        customIcon?: Component;
        closeable?: boolean;
        loading?: boolean;
    };

    const {
        closeToast,
        class: className,
        children,
        variant = 'default',
        customIcon,
        closeable = false,
        loading = false,
        ...rest
    }: Props = $props();
</script>

<Frame border class={['toast', variant, loading && 'toast-loading', className]} {...rest}>
    <Flex gap="sm" align="center" wrap={false}>
        <StatusIcon {variant} {customIcon} {loading} />

        {@render children?.()}

        {#if closeable}
            <Button
                class="toast-close"
                icon={XIcon}
                onclick={closeToast}
                variant="ghost"
                aria-label="Close"
            />
        {/if}
    </Flex>
</Frame>

<style>
    :global(.toast) {
        position: relative;
    }

    :global(.toast-close.btn) {
        position: absolute;
        right: var(--size-md);
    }
</style>
