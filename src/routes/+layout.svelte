<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import config from '$config';
	import { season } from '$lib/season.svelte';
	import { theme, labOn } from '$lib/theme.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { startSmoothScroll } from '$lib/motion/smooth-scroll';
	import AmbientBackground from '$lib/components/ambient/AmbientBackground.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Palette from site.config.ts → CSS variables that layout.css maps to Tailwind tokens.
	// Greens, accent and surface follow the runtime theme choice.
	const p = config.palette;
	const paletteCss = $derived.by(() => {
		const g = theme.greenSet;
		const surface =
			theme.surface === 'ochre' ? `color-mix(in oklab, ${p.clay} 72%, ${p.cream})` : p.cream;
		return (
			`:root{--sl-clay:${p.clay};--sl-wood:${p.wood};--sl-brick:${p.brick};` +
			`--sl-periwinkle:${p.periwinkle};--sl-moss:${g.moss};--sl-leaf:${g.leaf};` +
			`--sl-sky:${p.sky};--sl-sunset-from:${p.sunsetFrom};--sl-sunset-to:${p.sunsetTo};` +
			`--sl-silver:${p.silver};--sl-table:${p.table};--sl-log:${p.log};--sl-cream:${p.cream};--sl-ink:${p.ink};` +
			`--sl-slate:${p.slate};--sl-chalk-pink:${p.chalkPink};--sl-chalk-yellow:${p.chalkYellow};--sl-chalk-green:${p.chalkGreen};` +
			`--sl-accent:${theme.accentColour};--sl-surface:${surface}}`
		);
	});

	onMount(() => {
		theme.restore();
		season.sync();
		return startSmoothScroll();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{config.name} · {config.description.split('.')[0]}</title>
	<meta name="description" content={config.description} />
	<meta name="theme-color" content={p.cream} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- values are hex colours validated by the config schema -->
	{@html `<style>${paletteCss}</style>`}
</svelte:head>

<div style="display: contents" data-surface={theme.surface} data-accent={theme.accent}>
	<AmbientBackground />
	<Header />
	<main>{@render children()}</main>
	<Footer />
	{#if labOn}<ThemeSwitcher />{/if}
</div>
