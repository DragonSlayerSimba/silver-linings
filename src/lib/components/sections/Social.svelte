<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { socialPosts } from '$content';
	import config from '$config';
	import { photo } from '$lib/photos';

	// Stories people posted from the cafe, as a strip of polaroids. Each card credits the poster.
	const posts = socialPosts.flatMap((p) => {
		const src = photo('social', p.image.file);
		return src ? [{ ...p, src }] : [];
	});
</script>

<Section id="social" eyebrow="Moments" title="From the garden">
	{#if posts.length === 0}
		<p class="text-ink/60">
			Photos and posts will scroll through here.
			{#if config.contact.instagram}
				Meanwhile, find us on
				<a class="text-accent underline" href={config.contact.instagram}>Instagram</a>.
			{/if}
		</p>
	{:else}
		<div class="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pt-3 pb-6 sm:-mx-8 sm:px-8">
			{#each posts as post, i (post.image.file)}
				<a
					href={post.url}
					class={[
						'polaroid w-60 shrink-0 snap-start transition hover:scale-[1.02] hover:rotate-0 sm:w-64',
						i % 3 === 0 ? 'rotate-1' : i % 3 === 1 ? '-rotate-1' : 'rotate-[0.5deg]'
					]}
					target="_blank"
					rel="noopener"
				>
					<enhanced:img
						src={post.src}
						alt={post.image.alt}
						sizes="16rem"
						class="aspect-[4/5] w-full object-cover"
					/>
					<div class="flex items-baseline justify-between gap-2 px-2 pt-2">
						{#if post.caption}
							<p class="truncate text-sm text-ink/70">{post.caption}</p>
						{/if}
						{#if post.handle}
							<p class="ml-auto shrink-0 font-chalk text-base text-ink/60">@{post.handle}</p>
						{/if}
					</div>
				</a>
			{/each}
		</div>
		{#if config.contact.instagram}
			<a class="text-sm text-accent underline underline-offset-4" href={config.contact.instagram}
				>More on Instagram →</a
			>
		{/if}
	{/if}
</Section>

<style>
	.polaroid {
		display: block;
		background: white;
		padding: 0.6rem 0.6rem 0.9rem;
		border-radius: 0.25rem;
		box-shadow: 0 14px 30px -18px rgb(0 0 0 / 0.5);
	}
</style>
