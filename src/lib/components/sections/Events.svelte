<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { events } from '$content';
	import { photo } from '$lib/photos';
</script>

<Section
	id="events"
	eyebrow="Every day is an event when you believe in silver linings"
	title="Events"
>
	<div class="grid gap-6 sm:grid-cols-2">
		{#each events as ev (ev.title)}
			{@const src = photo('events', ev.image?.file)}
			<article class="overflow-hidden rounded-2xl border border-silver/70 bg-cream/40">
				{#if src && ev.image}
					<div class="relative">
						<enhanced:img
							{src}
							alt={ev.image.alt}
							sizes="(min-width: 640px) 50vw, 100vw"
							class="aspect-[3/2] w-full object-cover"
						/>
						{#if ev.image.credit}
							<span class="absolute right-3 bottom-2 font-chalk text-base text-cream/90 drop-shadow"
								>@{ev.image.credit}</span
							>
						{/if}
					</div>
				{/if}
				<div class="p-6">
					<p class="text-xs tracking-[0.2em] text-accent uppercase">{ev.when}</p>
					<h3 class="mt-1 text-2xl">{ev.title}</h3>
					<p class="mt-2 text-ink/80">{ev.description}</p>
				</div>
			</article>
		{/each}
	</div>
</Section>
