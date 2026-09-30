<script lang="ts">
	import { onMount } from 'svelte';
	import config from '$config';
	import type { MenuCategory, MenuTag } from '$lib/config/menu-schema';
	import { groups, visibleItems, tagLabel, boardClasses } from '$lib/menu';
	import { theme } from '$lib/theme.svelte';
	import CategoryIcon from './CategoryIcon.svelte';
	import MenuItemRow from './MenuItemRow.svelte';

	/**
	 * The full menu: three chalk tabs (Food / Drinks / Bakes), a sticky
	 * category rail that follows the scroll, and dotted-leader lists.
	 * Deep links work: /menu#smoothies opens the right tab and scrolls there.
	 */

	const chip = 'rounded-full border px-3 py-1 transition';
	const chipOff = 'border-ink/15 text-ink/75 hover:border-ink/40';
	const chipOn = 'border-accent bg-accent text-cream';

	const b = $derived(boardClasses(theme.board));

	let groupIndex = $state(0);
	let filter = $state<MenuTag | null>(null);
	let activeCategory = $state<string | null>(null);

	const group = $derived(groups[groupIndex]);
	// Every board is rendered (deep links, find-in-page and print need the ids); only one is shown.
	// Categories drop out when the filter leaves them empty.
	const boards = $derived(
		groups.map((g) => ({
			...g,
			categories: g.categories
				.map((c) => ({ ...c, items: visibleItems(c.items, filter) }))
				.filter((c) => c.items.length > 0)
		}))
	);
	const shown = $derived(boards[groupIndex].categories);

	/** Rows inside a category, grouped by optional subgroup heading, order preserved. */
	function sections(cat: MenuCategory) {
		const out: { title?: string; items: MenuCategory['items'] }[] = [];
		for (const it of cat.items) {
			const last = out.at(-1);
			if (last && last.title === it.subgroup) last.items.push(it);
			else out.push({ title: it.subgroup, items: [it] });
		}
		return out;
	}

	function selectGroup(i: number) {
		groupIndex = i;
		activeCategory = groups[i].categories[0]?.id ?? null;
	}

	// Scroll spy: the category whose heading last crossed the rail is active.
	let railEl = $state<HTMLElement>();
	function spy() {
		const top = (railEl?.getBoundingClientRect().bottom ?? 0) + 24;
		let current: string | null = null;
		for (const c of shown) {
			const el = document.getElementById(c.id);
			if (el && el.getBoundingClientRect().top <= top) current = c.id;
		}
		activeCategory = current ?? shown[0]?.id ?? null;
	}
	$effect(() => {
		// Keep the active chip in view on the rail without moving the page.
		if (!railEl || !activeCategory) return;
		const chip = railEl.querySelector<HTMLElement>(`[data-cat="${activeCategory}"]`);
		if (!chip) return;
		const left = chip.offsetLeft - railEl.clientWidth / 2 + chip.clientWidth / 2;
		railEl.scrollTo({ left, behavior: 'smooth' });
	});

	onMount(() => {
		const id = location.hash.slice(1);
		const gi = groups.findIndex((g) => g.categories.some((c) => c.id === id));
		if (gi >= 0) {
			selectGroup(gi);
			requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
		} else {
			activeCategory = group.categories[0]?.id ?? null;
		}
	});
</script>

<svelte:window onscroll={spy} />

<!-- Chalkboard strip: the three boards as tabs -->
<div
	role="tablist"
	aria-label="Menu boards"
	class={[
		'no-print mx-auto flex w-fit max-w-full gap-1 rounded-2xl p-1.5',
		b.panel,
		theme.board !== 'none' &&
			'shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06),0_10px_30px_-12px_rgb(0_0_0/0.5)]'
	]}
>
	{#each groups as g, i (g.id)}
		<button
			type="button"
			role="tab"
			aria-selected={i === groupIndex}
			class={[
				'rounded-xl px-5 py-1.5 font-chalk text-2xl leading-none transition sm:px-7 sm:text-3xl',
				b.word(i),
				i === groupIndex ? b.tabOn : b.tabOff
			]}
			onclick={() => selectGroup(i)}
		>
			{g.label}
		</button>
	{/each}
</div>

{#if config.menu.filters.length}
	<div class="no-print mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
		<span class="text-ink/50">Show</span>
		<button
			type="button"
			class={[chip, filter === null ? chipOn : chipOff]}
			aria-pressed={filter === null}
			onclick={() => (filter = null)}
		>
			Everything
		</button>
		{#each config.menu.filters as tag (tag)}
			<button
				type="button"
				class={[chip, filter === tag ? chipOn : chipOff]}
				aria-pressed={filter === tag}
				onclick={() => (filter = filter === tag ? null : tag)}
			>
				{tagLabel[tag]}
			</button>
		{/each}
	</div>
{/if}

<!-- Category rail; sticks under the header -->
<nav
	bind:this={railEl}
	aria-label="Categories"
	class="no-print sticky top-16 z-30 -mx-5 mt-8 rail bg-surface/90 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8"
>
	{#each shown as c (c.id)}
		<a
			href={`#${c.id}`}
			data-cat={c.id}
			class={[
				'flex shrink-0 snap-start items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition',
				activeCategory === c.id
					? 'border-accent bg-accent text-cream'
					: 'border-ink/15 text-ink/75 hover:border-ink/40'
			]}
			aria-current={activeCategory === c.id ? 'true' : undefined}
		>
			<CategoryIcon name={c.icon} class="text-[0.85em]" />
			{c.title}
		</a>
	{/each}
</nav>

{#each boards as board, i (board.id)}
	<div class={['mt-6 gap-x-12 lg:columns-2', i !== groupIndex && 'hidden print:block']}>
		<h2 class="mb-6 hidden font-chalk text-4xl print:block">{board.label}</h2>
		{#each board.categories as c (c.id)}
			<section
				id={c.id}
				class="mb-12 scroll-mt-40 break-inside-avoid"
				aria-labelledby={`${c.id}-h`}
			>
				<h3 id={`${c.id}-h`} class="flex items-center gap-3">
					<span class={['grid size-11 shrink-0 place-items-center rounded-full', b.disc]}>
						<CategoryIcon name={c.icon} class="text-[1.15em]" />
					</span>
					<span class="font-chalk text-4xl leading-none text-ink">{c.title}</span>
				</h3>
				{#if c.blurb}<p class="mt-2 ml-14 text-sm text-ink/60">{c.blurb}</p>{/if}
				{#each sections(c) as s, j (s.title ?? j)}
					{#if s.title}
						<p class="mt-5 mb-1 font-chalk text-xl text-accent">{s.title}</p>
					{/if}
					<ul class={['divide-y divide-ink/8', !s.title && 'mt-3']}>
						{#each s.items as item (item.id)}
							<MenuItemRow {item} />
						{/each}
					</ul>
				{/each}
				{#if c.note}<p class="mt-3 text-xs text-ink/55">{c.note}</p>{/if}
			</section>
		{/each}
		{#if board.categories.length === 0}
			<p class="py-10 text-center text-ink/60">Nothing on this board matches that filter.</p>
		{/if}
	</div>
{/each}

{#if config.menu.footnote || config.menu.lastVerified}
	<p class="mt-4 border-t border-ink/10 pt-6 text-xs text-ink/50">
		{config.menu.footnote}
		{#if config.menu.lastVerified}
			Menu checked {new Date(config.menu.lastVerified).toLocaleDateString(config.locale, {
				month: 'long',
				year: 'numeric'
			})}.
		{/if}
	</p>
{/if}
