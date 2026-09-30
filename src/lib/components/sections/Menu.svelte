<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import config from '$config';
	import type { MenuItem } from '$lib/config/menu-schema';
	import Section from '$lib/components/Section.svelte';
	import CategoryIcon from '$lib/components/menu/CategoryIcon.svelte';
	import { featured, categoryOf, groups, boardClasses, pictureOf } from '$lib/menu';
	import { priceLabel } from '$lib/utils';
	import { theme } from '$lib/theme.svelte';

	// Home-page teaser: the counter tile cycles through the counter photo and
	// the featured items that have one; hovering a favourite pins its photo.
	// Beside it, the list of favourites; below, the boards as chip rows.
	// The chalkboard treatment (slate / wood / none) is a Theme lab choice.
	const b = $derived(boardClasses(theme.board));

	interface Slide {
		key: string;
		src: string;
		alt: string;
		title: string;
		caption?: string;
		price?: string;
	}
	const slideFor = (item: MenuItem): Slide | null => {
		const image = item.image;
		const src = pictureOf(image?.file);
		if (!src || !image) return null;
		return {
			key: item.categoryId + '/' + item.id,
			src,
			alt: image.alt,
			title: item.name,
			caption: item.ingredients?.join(' · ') ?? item.description ?? categoryOf(item)?.blurb,
			price: config.menu.showPrices && item.price !== undefined ? priceLabel(item.price) : undefined
		};
	};
	const counter: Slide = {
		key: 'counter',
		src: pictureOf('counter.jpg') ?? '',
		alt: 'The dessert counter: pies and cakes behind glass, hand-lettered labels below',
		title: 'From the counter',
		caption: 'Baked in small batches, gone by evening.'
	};
	// Counter first, then the featured items with a photo, in featured order.
	const slides: Slide[] = [counter];
	for (const item of featured) {
		const s = slideFor(item);
		if (s) slides.push(s);
	}

	let auto = $state(0);
	let pinned = $state<string | null>(null);
	const current = $derived(pinned ? slides.findIndex((s) => s.key === pinned) : auto);
	const slide = $derived(slides[current] ?? counter);

	onMount(() => {
		if (slides.length < 2) return;
		const t = setInterval(() => {
			if (!pinned) auto = (auto + 1) % slides.length;
		}, config.menu.tileIntervalSeconds * 1000);
		return () => clearInterval(t);
	});

	function pin(item: MenuItem) {
		const key = item.categoryId + '/' + item.id;
		if (slides.some((s) => s.key === key)) pinned = key;
	}
	function unpin() {
		pinned = null;
	}
</script>

<Section id="menu" eyebrow="Silver lining in a cup" title="Menu" wall={theme.surface === 'cream'}>
	<div class="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
		<!-- The counter tile: photos on top, a label strip below, like the real one -->
		<a
			href="/menu#bakes"
			class="group block min-w-0 overflow-hidden rounded-3xl shadow-[0_24px_60px_-30px_rgb(0_0_0/0.55)]"
			aria-label="Bakes and desserts, from the counter"
		>
			<div class="relative aspect-[4/4.3] overflow-hidden bg-wood">
				{#each slides as s, i (s.key)}
					<div
						class="absolute inset-0 transition-opacity duration-[900ms] ease-soft"
						class:opacity-0={i !== current}
						aria-hidden={i !== current}
					>
						<enhanced:img
							src={s.src}
							alt={s.alt}
							sizes="(min-width: 1024px) 40vw, 100vw"
							loading={i === 0 ? 'eager' : 'lazy'}
							class="size-full max-w-full object-cover transition duration-700 ease-soft group-hover:scale-[1.03]"
						/>
					</div>
				{/each}
			</div>
			<div
				class={[
					'flex items-center justify-between gap-4 px-5 py-4 sm:px-6',
					theme.board === 'none' ? 'bg-wood text-cream/85' : b.panel
				]}
			>
				{#key slide.key}
					<div class="min-w-0" in:fade={{ duration: 300 }}>
						<p class="flex items-baseline gap-3 font-chalk text-3xl leading-none text-chalk-yellow">
							<span class="truncate">{slide.title}</span>
							{#if slide.price}<span class="font-sans text-sm opacity-85">{slide.price}</span>{/if}
						</p>
						{#if slide.caption}
							<p class="mt-1 truncate text-sm opacity-85">{slide.caption}</p>
						{/if}
					</div>
				{/key}
				<span
					class="grid size-10 shrink-0 place-items-center rounded-full border border-cream/40 transition group-hover:bg-cream group-hover:text-ink"
					aria-hidden="true">→</span
				>
			</div>
		</a>

		<!-- Favourites: hovering one with a photo shows it in the tile -->
		<div class="flex min-w-0 flex-col">
			<p class="max-w-md text-lg text-ink/75">
				Eggs and pancakes in the morning, soups and sandwiches by noon, pies from the counter all
				day. Hand-painted on the boards, hand-made in the kitchen.
			</p>

			{#if featured.length}
				<ul class="mt-6 divide-y divide-ink/10 border-y border-ink/10">
					{#each featured as item (item.categoryId + '/' + item.id)}
						{@const cat = categoryOf(item)}
						{@const hasPhoto = !!pictureOf(item.image?.file)}
						<li>
							<a
								href={`/menu#${item.categoryId}`}
								class={[
									'-mx-3 flex items-center gap-4 rounded-xl px-3 py-3.5 transition',
									hasPhoto && 'hover:bg-cream/50',
									pinned === item.categoryId + '/' + item.id && 'bg-cream/50'
								]}
								onpointerenter={() => pin(item)}
								onpointerleave={unpin}
								onfocus={() => pin(item)}
								onblur={unpin}
							>
								<span class={['grid size-10 shrink-0 place-items-center rounded-full', b.disc]}>
									<CategoryIcon name={item.icon ?? cat?.icon ?? 'bowl'} class="text-[1.05em]" />
								</span>
								<div class="min-w-0 flex-1">
									<div class="flex items-baseline gap-3">
										<h3 class="font-display text-lg leading-tight text-ink">{item.name}</h3>
										<span class="text-xs tracking-wide text-ink/45 uppercase">{cat?.title}</span>
									</div>
									{#if item.ingredients?.length}
										<p class="truncate text-sm text-ink/60">{item.ingredients.join(' · ')}</p>
									{:else if item.description}
										<p class="truncate text-sm text-ink/60">{item.description}</p>
									{/if}
								</div>
								{#if config.menu.showPrices && item.price !== undefined}
									<span class="text-sm whitespace-nowrap text-ink/75 tabular-nums"
										>{priceLabel(item.price)}</span
									>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			{/if}

			<a
				href="/menu"
				class="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition hover:brightness-110"
			>
				See the full menu
				<span aria-hidden="true">→</span>
			</a>
		</div>
	</div>

	<!-- The boards: one chip row each -->
	<div class={['mt-12 rounded-2xl px-5 py-4 sm:px-6', b.panel]}>
		{#each groups as g, gi (g.id)}
			<div class="flex flex-wrap items-center gap-x-3 gap-y-2 py-2">
				<span class={['w-16 font-chalk text-2xl leading-none', b.word(gi)]}>{g.label}</span>
				<ul class="flex flex-wrap gap-2">
					{#each g.categories as c (c.id)}
						<li>
							<a
								href={`/menu#${c.id}`}
								class={['block rounded-full border px-3 py-1 text-sm transition', b.chip]}
							>
								{c.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</Section>
