<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<div class="table-wrapper">
    <table>
        {@render children()}
    </table>
</div>

<style>
    .table-wrapper {
        width: 100%;
        overflow: auto;
        border-radius: var(--corner-radius);
        border: 1px solid var(--color-border);
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    :global(th),
    :global(td) {
        padding: var(--size-sm) var(--size-md);
        border-bottom: 1px solid var(--color-border);
        border-right: 1px solid var(--color-border);
        text-align: left;
    }

    :global(th:last-child),
    :global(td:last-child) {
        border-right: none;
    }

    :global(tbody tr:last-child td) {
        border-bottom: none;
    }

    :global(th) {
        background-color: var(--color-bg-subtle);
        font-weight: bold;
        border-bottom: 1px solid var(--color-border);
    }
</style>
