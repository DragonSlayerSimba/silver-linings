<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { shopGroups } from '$content';
	import { photo } from '$lib/photos';
</script>

<Section id="shop" eyebrow="Local produce and artists" title="Made with love in Bir">
	<!-- Same card as Events: photo, title, a few lines. Phones: a sideways strip. -->
	<div
		class="-mx-5 flex snap-x snap-mandatory scroll-px-5 strip-scroll gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0"
	>
		{#each shopGroups as group (group.title)}
			{@const src = photo('shop', group.image.file)}
			<article
				class="w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-silver/70 bg-cream/40 sm:w-auto"
			>
				{#if src}
					<enhanced:img
						{src}
						alt={group.image.alt}
						sizes="(min-width: 640px) 50vw, 85vw"
						class="aspect-[3/2] w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				{/if}
				<div class="p-6">
					<h3 class="text-2xl">{group.title}</h3>
					<p class="mt-2 text-ink/80">{group.description}</p>
				</div>
			</article>
		{/each}
	</div>
</Section>
