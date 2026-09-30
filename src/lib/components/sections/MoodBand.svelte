<script lang="ts">
	import { skyPhoto } from '$lib/mood-photos';
	import { theme } from '$lib/theme.svelte';

	const sky = $derived(skyPhoto(theme.sky));

	// Trial: a full-bleed photo band between sections (Theme lab → Sunset → band).
	// Later this could hold a per-mood photo or a short timelapse loop.
</script>

<section aria-label="Sunset over Bir" class="relative isolate my-8 overflow-hidden">
	{#key sky.file}
		<enhanced:img
			src={sky.src}
			alt={sky.alt}
			sizes="100vw"
			class="absolute inset-0 -z-10 size-full object-cover"
			style={`object-position: ${sky.position}`}
		/>
	{/key}
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
	></div>
	<div class="container-sl flex min-h-[70vh] flex-col justify-end pb-12 sm:min-h-[80vh] sm:pb-16">
		<p class="font-display text-4xl text-cream italic sm:text-6xl">Every cloud hides a spark</p>
		<p class="mt-3 text-xs tracking-[0.2em] text-cream/70 uppercase">
			Sunsets, seedlings and silver linings
		</p>
	</div>
</section>
