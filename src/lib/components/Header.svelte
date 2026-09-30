<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import config from '$config';
	import { theme } from '$lib/theme.svelte';

	const nav = config.sections.filter((s) => s.enabled && s.navLabel);
	// Section anchors only exist on the home page; elsewhere link back to it.
	const home = $derived(page.url.pathname === '/');
	const anchor = (id: string) => (home ? `#${id}` : `/#${id}`);

	// Are we still over the hero? Switches the header from photo mode to bar mode.
	let scrollY = $state(0);
	let heroBottom = $state(Infinity);
	const overHero = $derived(scrollY < heroBottom - 72);

	function measure() {
		const hero = document.getElementById('hero');
		heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
	}
	onMount(measure);

	// Light text when the nav floats over a photo (scrim mode on the hero, or the dark treatment).
	const light = $derived(overHero && theme.header === 'scrim');
	const hidden = $derived(overHero && theme.header === 'hidden');
	const frosted = $derived(theme.header === 'frosted');
</script>

<svelte:window bind:scrollY onresize={measure} />

<header
	class={[
		'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,transform,opacity] duration-500 ease-soft',
		light && 'header-scrim',
		!overHero && !frosted && 'bg-surface/85 shadow-[0_1px_0_0_rgb(0_0_0/0.06)] backdrop-blur',
		hidden && '-translate-y-full opacity-0'
	]}
>
	<div class="container-sl flex items-center justify-between py-4">
		<!-- Wordmark hides on the hero (the H1 is the wordmark there) and fades in on scroll. -->
		<a
			href={anchor('hero')}
			class={[
				'font-display text-xl tracking-tight transition-opacity duration-500 sm:text-2xl',
				light ? 'text-cream' : 'text-ink',
				overHero ? 'pointer-events-none opacity-0' : 'opacity-100'
			]}
			aria-hidden={overHero}
			tabindex={overHero ? -1 : 0}
		>
			{config.shortName}
		</a>
		<nav
			aria-label="Sections"
			class={[
				'hidden gap-6 text-sm sm:flex',
				frosted && 'rounded-full border border-ink/10 bg-cream/70 px-5 py-2 shadow-sm backdrop-blur'
			]}
		>
			{#each nav as s (s.id)}
				<a
					href={anchor(s.id)}
					class={[
						'transition hover:underline hover:decoration-silver hover:underline-offset-4',
						light ? 'text-cream/90 hover:text-cream' : 'text-ink/80 hover:text-accent'
					]}
				>
					{s.navLabel}
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	.header-scrim {
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--sl-ink) 55%, transparent),
			transparent
		);
		padding-bottom: 2.5rem;
		margin-bottom: -2.5rem;
	}
</style>
