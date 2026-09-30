<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { shopItems } from '$content';
	import { priceLabel } from '$lib/utils';
	import { photo } from '$lib/photos';
</script>

<Section id="shop" eyebrow="Small things" title="Made with love in Bir">
	<!-- Phones: a sideways strip, next card peeking. sm and up: the grid. -->
	<ul
		class="-mx-5 flex snap-x snap-mandatory scroll-px-5 strip-scroll gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
	>
		{#each shopItems as item (item.name)}
			{@const src = photo('shop', item.image?.file)}
			<li class="w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl bg-wood/10 sm:w-auto">
				{#if src && item.image}
					<enhanced:img
						{src}
						alt={item.image.alt}
						sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"
						class="aspect-square w-full object-cover"
					/>
				{/if}
				<div class="p-5">
					<h3 class="text-xl">{item.name}</h3>
					<p class="mt-2 text-sm text-ink/70">{item.description}</p>
					<p class="mt-3 text-xs text-ink/50">
						{#if item.maker}{item.maker}{/if}
						{#if item.price}· {priceLabel(item.price)}{/if}
					</p>
				</div>
			</li>
		{/each}
	</ul>
</Section>
