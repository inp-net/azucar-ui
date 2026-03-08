<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	// --- Frame ---
	// A simple container with padding, border-radius, and optional shadow and border.

	type Props = HTMLAttributes<HTMLDivElement> & {
		transparent?: boolean;
		shadow?: boolean;
		border?: boolean;
	};

	let {
		children,
		class: className,
		transparent = false,
		shadow = false,
		border = false,
		...rest
	}: Props = $props();
</script>

<div
	class={`frame
		${transparent ? 'is-transparent' : ''}
		${shadow ? 'has-shadow' : ''}
		${border ? 'has-border' : ''}
		${className || ''}`}
	{...rest}
>
	{@render children?.()}
</div>

<style>
	.frame {
		border-radius: var(--corner-radius);
		padding: var(--size-md) var(--size-lg);
		color: var(--color-fg-high);
	}

	.frame.is-transparent {
		background-color: color-mix(in oklch, var(--color-bg-subtle) 80%, transparent);
		backdrop-filter: blur(var(--size-sm));
	}

	.frame:not(.is-transparent) {
		background-color: var(--color-bg-subtle);
	}

	.frame.has-border {
		border: 1px solid var(--color-border);
	}

	.frame.has-shadow {
		box-shadow: var(--shadow-surface);
	}
</style>
