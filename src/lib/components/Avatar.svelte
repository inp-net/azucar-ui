<script lang="ts">
	// --- Avatar ---
	// A simple avatar component that displays a user's profile picture or initials.

	type Props = {
		src?: string;
		alt?: string;
		size?: 'small' | 'large';
	};

	const { src, alt = 'Avatar', size = 'small' }: Props = $props();
</script>

<div class={`avatar avatar-${size}`}>
	{#if src}
		<img {src} {alt} />
	{:else}
		<span class="initials">{alt.charAt(0).toUpperCase()}</span>
	{/if}
</div>

<style>
	.avatar {
		aspect-ratio: 1 / 1;
		border-radius: var(--corner-radius-full);
		overflow: hidden;
		background-color: var(--color-bg-solid);
	}

	.initials {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}

	.avatar-small {
		width: var(--size-xl);
	}

	.avatar-large {
		width: var(--size-xxl);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
