<script lang="ts">
	import { onMount } from 'svelte';
	import Switch from './Switch.svelte';
	import Slider from './Slider.svelte';
	import Stack from './layout/Stack.svelte';

	// --- Picker ---
	// A simple component that allows you to pick a base color and toggle dark mode.

	let l = $state(0);
	let c = $state(0);
	let h = $state(0);
	let isDarkTheme = $state(true);
	let cornerRadius = $state(0);

	onMount(() => {
		const computedStyle = getComputedStyle(document.documentElement);
		const baseColor = computedStyle.getPropertyValue('--base-color').trim();

		if (baseColor) {
			const match = baseColor.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);

			if (match) {
				l = parseFloat(match[1]);
				c = parseFloat(match[2]);
				h = parseFloat(match[3]);
			}
		}

		const colorScheme = computedStyle.getPropertyValue('color-scheme').trim();
		isDarkTheme = colorScheme === 'dark';
		const radius = computedStyle.getPropertyValue('--corner-radius').trim();
		if (radius) {
			console.log('radius:', radius);
			cornerRadius = parseFloat(radius);
		}
	});

	$effect(() => {
		document.documentElement.style.setProperty('--base-color', `oklch(${l} ${c} ${h})`);
		document.documentElement.style.setProperty('color-scheme', isDarkTheme ? 'dark' : 'light');
		document.documentElement.style.setProperty('--corner-radius', `${cornerRadius}rem`);
	});
</script>

<Stack>
	<Slider
		min={0}
		max={1}
		step={0.01}
		bind:value={l}
		style={`--slider-background: linear-gradient(to right, oklch(0 ${c} ${h}), oklch(100 ${c} ${h}));\
                --slider-background-hover: linear-gradient(to right, oklch(0 ${c} ${h}), oklch(100 ${c} ${h}));`}
		>Lightness</Slider
	>
	<Slider
		min={0}
		max={0.4}
		step={0.001}
		bind:value={c}
		style={`--slider-background: linear-gradient(to right, oklch(${l} 0 ${h}), oklch(${l} 0.4 ${h}));\
                --slider-background-hover: linear-gradient(to right, oklch(${l} 0 ${h}), oklch(${l} 0.4 ${h}));`}
		>Chroma</Slider
	>
	<Slider
		min={0}
		max={360}
		step={0.1}
		bind:value={h}
		style={`--slider-background: linear-gradient(to right, oklch(${l} ${c} 0), oklch(${l} ${c} 45), oklch(${l} ${c} 90), oklch(${l} ${c} 135), oklch(${l} ${c} 180), oklch(${l} ${c} 225), oklch(${l} ${c} 270), oklch(${l} ${c} 315), oklch(${l} ${c} 360));\
                --slider-background-hover: linear-gradient(to right, oklch(${l} ${c} 0), oklch(${l} ${c} 45), oklch(${l} ${c} 90), oklch(${l} ${c} 135), oklch(${l} ${c} 180), oklch(${l} ${c} 225), oklch(${l} ${c} 270), oklch(${l} ${c} 315), oklch(${l} ${c} 360));`}
		>Hue</Slider
	>
	<Slider min={0} max={1.25} step={0.01} bind:value={cornerRadius}>Corner Radius</Slider>

	<Switch bind:checked={isDarkTheme}>Dark Mode</Switch>
</Stack>
