<script lang="ts">
    import type { Component } from 'svelte';

    // --- IconWrapper ---
    // Wrapper around icon. Supports LucideIcon and regular svg component.

    type Props = {
        icon?: Component;
        size?: string;
    };

    let { icon, size }: Props = $props();
</script>

{#if icon}
    {@const Icon = icon}
    <div style={`--icon-size: ${size}`} class="icon-wrapper" aria-hidden="true">
        <Icon {size} />
    </div>
{/if}

<style>
    /* wrapper around the icon */
    .icon-wrapper {
        height: var(--icon-size);
        width: max-content;
    }

    /* make the SVG in the component take all the space */
    :global(.icon-wrapper > svg) {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
