<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	// --- Switch ---
	// A simple on/off toggle.

	type Props = HTMLInputAttributes & {
		type?: 'checkbox';
	};

	let { children, checked = $bindable(false), ...rest }: Props = $props();
</script>

<label class="switch" class:has-label={children}>
	{#if children}
		<span class="label">
			{@render children?.()}
		</span>
	{/if}
	<input type="checkbox" bind:checked {...rest} />
	<span class="slider"></span>
</label>

<style>
	:root {
		--switch-width: 40px;
		--switch-height: 20px;
		--switch-slider-width: 22px;
	}

	.switch {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--size-xs);
		width: var(--switch-width);
		height: var(--switch-height);
		cursor: pointer;
	}

	.switch.has-label {
		width: auto;
	}

	input {
		opacity: 0;
		width: 0;
		height: 0;
		position: absolute;
	}

	.slider {
		--base-color: var(--color-neutral);
		position: relative;
		flex-shrink: 0;
		width: var(--switch-width);
		height: var(--switch-height);
		background-color: var(--color-bg-solid);
		border-radius: var(--corner-radius);
		box-shadow: var(--shadow-surface);
	}

	.slider:before {
		position: absolute;
		content: '';
		height: calc(var(--switch-height) - 4px);
		width: var(--switch-slider-width);
		left: 2px;
		bottom: 2px;
		background-color: var(--color-fg-solid);
		border-radius: var(--corner-radius);
		box-shadow: var(--shadow-surface);
	}

	.label {
		user-select: none;
	}

	/* Expanding a bit on active */
	input:active:not(:disabled) + .slider:before {
		width: calc(var(--switch-slider-width) + 2px);
	}

	input:active:checked:not(:disabled) + .slider:before {
		left: 0px;
	}

	/* Focus visible - apply to slider since input is hidden */
	input:focus-visible + .slider {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	input:hover:not(:disabled) + .slider {
		background-color: var(--color-bg-solid-hover);
	}

	input:checked:not(:disabled) + .slider {
		--base-color: var(--color-accent);
	}

	input:checked + .slider:before {
		transform: translateX(14px);
	}

	.switch:has(input:disabled) {
		cursor: not-allowed;
	}

	input:disabled + .slider {
		background-color: var(--color-bg);
	}

	input:disabled + .slider:before {
		background-color: var(--color-border-subtle);
	}

	.switch:has(input:disabled) .label {
		--base-color: var(--color-neutral);
		color: var(--color-border-subtle);
		cursor: not-allowed;
	}
</style>
