<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { memories } from '$content';
	import type { Photo } from '$content';
	import { photo } from '$lib/photos';
	import { theme } from '$lib/theme.svelte';

	// Two layouts, picked in the Theme lab (theme.memory):
	//  strip    one horizontal row of polaroids along a dotted line, like prints on a string
	//  timeline the vertical list with a photo beside each entry

	interface Card {
		key: string;
		when: string;
		title?: string;
		story?: string;
		image: Photo;
		src: string;
	}
	// The strip flattens galleries: each picture becomes its own card, the text rides on the first.
	const cards: Card[] = memories.flatMap((m) => {
		const pics = m.image ? [m.image, ...(m.gallery ?? [])] : (m.gallery ?? []);
		return pics.flatMap((p, i) => {
			const src = photo('memory', p.file);
			if (!src) return [];
			return [
				{
					key: p.file,
					when: m.when,
					title: i === 0 ? m.title : undefined,
					story: i === 0 ? m.story : undefined,
					image: p,
					src
				}
			];
		});
	});
</script>

<Section id="memory-lane" eyebrow="Silver Linings" title="Down the memory lane">
	{#if theme.memory === 'strip'}
		<div class="relative -mx-5 sm:-mx-8">
			<!-- the string the prints hang from -->
			<div
				class="pointer-events-none absolute inset-x-0 top-3 border-t-2 border-dotted border-ink/25"
				aria-hidden="true"
			></div>
			<ol class="flex snap-x gap-6 overflow-x-auto px-5 pt-0 pb-6 sm:px-8">
				{#each cards as c, i (c.key)}
					<li class="relative w-64 shrink-0 snap-start pt-8 sm:w-72">
						<span
							class="absolute top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-surface"
							aria-hidden="true"
						></span>
						<figure class={['polaroid', i % 3 === 0 ? 'rotate-1' : i % 3 === 1 ? '-rotate-1' : '']}>
							<enhanced:img
								src={c.src}
								alt={c.image.alt}
								sizes="18rem"
								class="aspect-[4/5] w-full object-cover"
							/>
							<figcaption class="flex items-baseline justify-between gap-2 px-1 pt-2">
								<span class="font-chalk text-lg text-ink/80">{c.when}</span>
								{#if c.image.credit}
									<span class="truncate text-xs text-ink/50">@{c.image.credit}</span>
								{/if}
							</figcaption>
						</figure>
					</li>
				{/each}
			</ol>
		</div>
	{:else}
		<ol class="relative space-y-16 border-l border-silver pl-8 sm:pl-12">
			{#each memories as m, i (m.title)}
				{@const src = photo('memory', m.image?.file)}
				<li class="relative">
					<span
						class="absolute top-2 -left-[2.35rem] size-3 rounded-full bg-accent ring-4 ring-surface sm:-left-[3.35rem]"
					></span>
					<div class={['grid items-start gap-6', src && 'lg:grid-cols-[1fr_22rem]']}>
						<div>
							<p class="text-xs tracking-[0.2em] text-ink/50 uppercase">{m.when}</p>
							<h3 class="mt-1 text-2xl sm:text-3xl">{m.title}</h3>
							<p class="mt-3 max-w-prose text-ink/80">{m.story}</p>
						</div>
						{#if src && m.image}
							<figure class={['polaroid', i % 2 ? '-rotate-1' : 'rotate-1']}>
								<enhanced:img
									{src}
									alt={m.image.alt}
									sizes="(min-width: 1024px) 22rem, 100vw"
									class="aspect-[4/5] w-full object-cover"
								/>
								{#if m.image.credit}
									<figcaption class="px-2 pt-2 text-right font-chalk text-base text-ink/60">
										@{m.image.credit}
									</figcaption>
								{/if}
							</figure>
						{/if}
					</div>
					{#if m.gallery}
						<ul class="-mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
							{#each m.gallery as g (g.file)}
								{@const gsrc = photo('memory', g.file)}
								{#if gsrc}
									<li class="polaroid w-52 shrink-0 snap-start sm:w-60">
										<enhanced:img
											src={gsrc}
											alt={g.alt}
											sizes="15rem"
											class="aspect-[4/5] w-full object-cover"
										/>
										{#if g.credit}
											<p class="px-2 pt-2 text-right font-chalk text-sm text-ink/60">@{g.credit}</p>
										{/if}
									</li>
								{/if}
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ol>
	{/if}
</Section>

<style>
	.polaroid {
		background: white;
		padding: 0.6rem 0.6rem 0.9rem;
		border-radius: 0.25rem;
		box-shadow: 0 14px 30px -18px rgb(0 0 0 / 0.5);
	}
</style>
