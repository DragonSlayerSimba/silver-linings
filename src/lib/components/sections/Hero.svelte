<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import config from '$config';
	import { heroImages } from '$content';
	import { theme } from '$lib/theme.svelte';

	// Photos are processed by @sveltejs/enhanced-img into responsive avif/webp at build time.
	const pictures = import.meta.glob('/src/lib/assets/photos/hero/*.jpg', {
		eager: true,
		import: 'default',
		query: { enhanced: true, w: '640;1280;1920' }
	}) as Record<string, string>;
	const slides = heroImages
		.map((h) => ({ ...h, src: pictures[`/src/lib/assets/photos/hero/${h.file}`] }))
		.filter((s) => s.src);

	let index = $state(0);
	let slide = $state(0);
	const tagline = $derived(config.taglines[index]);

	onMount(() => {
		const timers: ReturnType<typeof setInterval>[] = [];
		if (config.taglines.length > 1) {
			timers.push(
				setInterval(
					() => (index = (index + 1) % config.taglines.length),
					config.taglineIntervalSeconds * 1000
				)
			);
		}
		if (slides.length > 1) {
			timers.push(
				setInterval(
					() => (slide = (slide + 1) % slides.length),
					config.heroImageIntervalSeconds * 1000
				)
			);
		}
		return () => timers.forEach(clearInterval);
	});
</script>

<section
	id="hero"
	data-photo={theme.photo}
	data-text={theme.text}
	class={[
		'hero relative flex min-h-dvh flex-col overflow-hidden',
		theme.text === 'left' && 'justify-end pb-20 sm:pb-28',
		theme.text === 'center' && 'items-center justify-center pt-24 pb-24 text-center',
		theme.text === 'panel' && 'justify-center py-24',
		theme.surface === 'hybrid' && 'wall'
	]}
>
	<!-- Photo layer -->
	<div class="absolute inset-0" aria-hidden="true">
		{#each slides as s, i (s.file)}
			<div
				class="absolute inset-0 transition-opacity duration-[1600ms] ease-soft"
				class:opacity-0={i !== slide}
			>
				<enhanced:img
					src={s.src}
					alt=""
					class="size-full object-cover"
					style={`object-position: ${s.position ?? '50% 50%'}`}
					sizes="100vw"
					fetchpriority={i === 0 ? 'high' : 'auto'}
					loading={i === 0 ? 'eager' : 'lazy'}
				/>
			</div>
		{/each}
		<div class="scrim absolute inset-0"></div>
	</div>

	<!-- Text block -->
	<div
		class={[
			'copy relative',
			theme.text === 'panel'
				? 'w-[min(100%,36rem)] rounded-r-3xl bg-surface/95 px-6 py-10 pl-[max(1.25rem,calc((100vw-72rem)/2+2rem))] shadow-xl sm:py-14 sm:pr-12'
				: 'container-sl'
		]}
	>
		<p class="eyebrow mb-4 text-xs tracking-[0.25em] uppercase">
			A hand-crafted mud cafe · Bir, Himachal
		</p>
		<h1 class="title text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">{config.name}</h1>
		<div class="mt-6 h-16 sm:h-20" aria-live="polite">
			{#key index}
				<p
					class="tagline font-display text-2xl italic sm:text-4xl"
					in:fly={{ y: 14, duration: 700, delay: 250 }}
					out:fade={{ duration: 250 }}
				>
					{tagline}
				</p>
			{/key}
		</div>
	</div>

	<!-- Corner: scroll hint -->
	<div
		class="corner absolute right-6 bottom-6 flex flex-col items-end gap-1 text-right text-xs sm:right-10"
	>
		<a href="#menu" class="tracking-[0.2em] uppercase" aria-label="Scroll to the menu">scroll ↓</a>
	</div>
</section>

<style>
	/* ---- photo treatments ---- */
	.hero {
		--hero-bg: var(--sl-surface);
		color: var(--sl-ink);
	}
	:global([data-surface='hybrid']) .hero {
		--hero-bg: color-mix(in oklab, var(--sl-clay) 78%, var(--sl-cream));
	}
	.tagline {
		color: var(--sl-accent);
	}
	.eyebrow,
	.corner {
		color: color-mix(in oklab, var(--sl-ink) 75%, transparent);
	}

	/* natural: photo untouched, fades into the page only where the text sits */
	[data-photo='natural'] .scrim {
		background: linear-gradient(
			180deg,
			transparent 40%,
			color-mix(in oklab, var(--hero-bg) 75%, transparent) 70%,
			var(--hero-bg) 100%
		);
	}
	/* dark: bottom darkening, light text */
	[data-photo='dark'] {
		color: var(--sl-cream);
	}
	[data-photo='dark'] .scrim {
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--sl-ink) 20%, transparent) 0%,
			transparent 30%,
			color-mix(in oklab, var(--sl-ink) 45%, transparent) 65%,
			color-mix(in oklab, var(--sl-ink) 78%, transparent) 100%
		);
	}
	[data-photo='dark'] .tagline {
		color: color-mix(in oklab, var(--sl-accent) 55%, white);
	}
	[data-photo='dark'] .eyebrow,
	[data-photo='dark'] .corner {
		color: color-mix(in oklab, var(--sl-cream) 80%, transparent);
	}
	/* tint: light page-colour wash for a consistent house look */
	[data-photo='tint'] .scrim {
		background:
			linear-gradient(
				180deg,
				transparent 35%,
				color-mix(in oklab, var(--hero-bg) 70%, transparent) 65%,
				var(--hero-bg) 100%
			),
			color-mix(in oklab, var(--hero-bg) 30%, transparent);
	}

	/* ---- text placements ---- */
	[data-text='center'][data-photo='natural'] .scrim {
		background:
			radial-gradient(
				ellipse 60% 45% at 50% 60%,
				color-mix(in oklab, var(--hero-bg) 80%, transparent),
				transparent
			),
			linear-gradient(180deg, transparent 55%, var(--hero-bg) 100%);
	}
	[data-text='center'][data-photo='dark'] .scrim {
		background:
			radial-gradient(
				ellipse 60% 45% at 50% 60%,
				color-mix(in oklab, var(--sl-ink) 60%, transparent),
				transparent
			),
			linear-gradient(180deg, transparent 60%, color-mix(in oklab, var(--sl-ink) 60%, transparent));
	}
	/* panel: the photo needs no scrim at all */
	[data-text='panel'] .scrim {
		background: linear-gradient(180deg, transparent 80%, var(--hero-bg) 100%);
	}
	[data-text='panel'] .copy,
	[data-text='panel'] .eyebrow {
		color: var(--sl-ink);
	}
	[data-text='panel'] .eyebrow {
		color: color-mix(in oklab, var(--sl-ink) 75%, transparent);
	}
	[data-text='panel'] .tagline {
		color: var(--sl-accent);
	}
</style>
