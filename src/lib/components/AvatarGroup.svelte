<script lang="ts">
    import { onMount, type Snippet } from 'svelte';
    import { Avatar, type Size } from '#lib/index.ts';

    type Props = {
        children: Snippet;
        size: Size;
        limit?: number;
    };

    // --- AvatarGroup ---
    // A component that groups avatars together and applies consistent styling
    // with a limit on the number of visible avatars.

    let { children, size, limit = 3 }: Props = $props();

    let childrenCount = $state(0);
    let avatarSize = $state<string | null>(null);

    onMount(() => {
        avatarSize = window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(`--size-${size}`);
    });

    // can't do it in the markup because the children are not available yet
    // so we need to use a mutation observer to hide the extra children
    // and can't do it in css either because of dynamic max value
    function limitChildren(node: HTMLElement, limit: number) {
        const update = () => {
            const children = Array.from(node.children).filter(
                (child) => !child.classList.contains('avatar-group-overflow')
            );
            childrenCount = children.length;
            children.forEach((child, index) => ((child as HTMLElement).hidden = index >= limit));
        };
        update();

        const observer = new MutationObserver(update);
        observer.observe(node, { childList: true });

        return {
            update(nextLimit: number) {
                limit = nextLimit;
                update();
            },
            destroy: () => observer.disconnect()
        };
    }
</script>

<div use:limitChildren={limit} class="avatar-group" style:--avatar-size={avatarSize}>
    {@render children?.()}
    {#if childrenCount > limit}
        <Avatar class="avatar-group-overflow" {size} alt={`+ ${childrenCount - limit}`} />
    {/if}
</div>

<style>
    .avatar-group {
        display: flex;
    }

    :global(.avatar-group > *:not(:first-child)) {
        margin-left: calc(-1 * var(--avatar-size) / 4);
    }
</style>
