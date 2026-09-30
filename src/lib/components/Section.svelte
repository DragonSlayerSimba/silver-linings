<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		eyebrow,
		title,
		wall = false,
		children
	}: { id: string; eyebrow?: string; title: string; wall?: boolean; children: Snippet } = $props();
</script>

<section {id} class={['scroll-mt-20 py-12 sm:py-16', wall && 'wall']}>
	<div class="container-sl">
		{#if eyebrow}
			<p class="mb-2 text-xs tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
		{/if}
		<h2 class="mb-8 text-3xl text-ink sm:text-5xl">{title}</h2>
		{@render children()}
	</div>
</section>
