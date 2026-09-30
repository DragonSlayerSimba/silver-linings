<script lang="ts">
	import config from '$config';
	import type { MenuItem } from '$lib/config/menu-schema';
	import { priceLabel, rupees } from '$lib/utils';
	import { tagLabel } from '$lib/menu';

	let { item }: { item: MenuItem } = $props();

	const showPrice = $derived(config.menu.showPrices && item.price !== undefined);
	// Veg/egg square, the marker Indian menus use. Vegan counts as veg.
	const marker = $derived(
		item.tags.includes('egg')
			? 'egg'
			: item.tags.includes('veg') || item.tags.includes('vegan')
				? 'veg'
				: null
	);
	const chips = $derived(
		(['vegan', 'spicy', 'new', 'seasonal'] as const).filter((t) => item.tags.includes(t))
	);
</script>

<li class="py-2.5">
	<div class="flex items-baseline">
		<span class="flex min-w-0 items-baseline gap-2">
			{#if marker}
				<span
					class={[
						'mb-px inline-block size-2.5 shrink-0 self-center border',
						marker === 'veg' ? 'border-moss' : 'border-sunset-from'
					]}
					title={marker === 'veg' ? 'Vegetarian' : 'Contains egg'}
				>
					<span
						class={[
							'block size-full scale-[0.55] rounded-full',
							marker === 'veg' ? 'bg-moss' : 'bg-sunset-from'
						]}
					></span>
				</span>
			{/if}
			<span class="font-medium text-ink">{item.name}</span>
			{#if item.tags.includes('signature')}
				<span class="text-accent" title={tagLabel.signature} aria-label={tagLabel.signature}>✦</span
				>
			{/if}
			{#each chips as tag (tag)}
				<span
					class={[
						'rounded-full border px-1.5 text-[0.65rem] tracking-wide uppercase',
						tag === 'spicy' ? 'border-brick/40 text-brick' : 'border-moss/40 text-moss'
					]}
				>
					{tagLabel[tag]}
				</span>
			{/each}
		</span>
		{#if showPrice}
			<span class="leader" aria-hidden="true"></span>
			<span class="text-sm whitespace-nowrap text-ink/75 tabular-nums"
				>{priceLabel(item.price)}</span
			>
		{/if}
	</div>
	{#if item.ingredients?.length}
		<p class="mt-0.5 text-sm text-ink/60">{item.ingredients.join(' · ')}</p>
	{/if}
	{#if item.description}
		<p class="mt-0.5 text-sm text-ink/60">{item.description}</p>
	{/if}
	{#if item.addOns.length}
		<p class="mt-0.5 text-xs text-ink/50">
			{#each item.addOns as add, i (add.name)}
				{i ? ' · ' : ''}{add.name}{#if config.menu.showPrices}&nbsp;+{rupees(add.price)}{/if}
			{/each}
		</p>
	{/if}
</li>
