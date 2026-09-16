<script lang="ts">
    import type { Component } from 'svelte';
    import {
        CircleCheckIcon,
        CircleXIcon,
        InfoIcon,
        LoaderCircleIcon,
        TriangleAlertIcon
    } from '@lucide/svelte';

    type Props = {
        variant?: 'default' | 'success' | 'danger' | 'warning';
        customIcon?: Component;
        loading?: boolean;
    };

    let { variant = 'default', customIcon, loading = false }: Props = $props();
</script>

{#if loading}
    <LoaderCircleIcon class="loading-icon" aria-hidden="true" />
{:else if customIcon}
    {@const IconComponent = customIcon}
    <IconComponent class="icon" aria-hidden="true" />
{:else if variant === 'success'}
    <CircleCheckIcon aria-hidden="true" />
{:else if variant === 'danger'}
    <CircleXIcon aria-hidden="true" />
{:else if variant === 'warning'}
    <TriangleAlertIcon aria-hidden="true" />
{:else}
    <InfoIcon aria-hidden="true" />
{/if}
