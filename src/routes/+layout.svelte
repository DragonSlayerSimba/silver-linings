<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { asset } from '$app/paths';
	import config from '$config';
	import { menu } from '$content';
	import { structuredData } from '$lib/seo';
	import { season } from '$lib/season.svelte';
	import { theme, labOn } from '$lib/theme.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
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

	// Search and share metadata. Canonical URLs always point at the production domain,
	// so the GitHub Pages test copy (served under a base path) never competes with it.
	// Built from the route id, not the URL: `base` is relative while prerendering.
	const indexable = $derived(page.route.id === '/' || page.route.id === '/menu');
	const canonical = $derived(`${config.url}${page.route.id === '/' ? '/' : page.route.id}`);
	const title = $derived(
		page.route.id === '/menu'
			? `Menu · ${config.name}`
			: `${config.name} · ${config.description.split('.')[0]}`
	);
	const share = `${config.url}/og.jpg`;
	// The closing tag is split so it cannot end this <script> block.
	const jsonLd = `<script type="application/ld+json">${structuredData(config, menu, share)}</${'script'}>`;

	onMount(() => {
		theme.restore();
		season.sync();
		// Smooth scrolling (Lenis + GSAP, ~50 KB) loads after the page is interactive.
		let stop: (() => void) | undefined;
		let cancelled = false;
		import('$lib/motion/smooth-scroll').then(({ startSmoothScroll }) => {
			if (!cancelled) stop = startSmoothScroll();
		});
		return () => {
			cancelled = true;
			stop?.();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.svg')} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={asset('/apple-touch-icon.png')} />
	<link rel="manifest" href={asset('/site.webmanifest')} />
	<title>{title}</title>
	<meta name="description" content={config.description} />
	<meta name="theme-color" content={p.cream} />
	{#if indexable}
		<link rel="canonical" href={canonical} />
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content={config.name} />
		<meta property="og:locale" content={config.locale.replace('-', '_')} />
		<meta property="og:url" content={canonical} />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={config.description} />
		<meta property="og:image" content={share} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:alt" content={`Inside ${config.name}, the mud-walled cafe in Bir`} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={config.description} />
		<meta name="twitter:image" content={share} />
	{/if}
	{#if page.route.id === '/'}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON built from the validated config -->
		{@html jsonLd}
	{/if}
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
