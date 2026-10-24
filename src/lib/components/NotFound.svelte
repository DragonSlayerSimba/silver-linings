<script lang="ts">
	import { resolve } from '$app/paths';
	import config from '$config';

	// Shown for unknown URLs: prerendered as 404.html (src/routes/404) and by +error.svelte.
</script>

<div class="container-sl flex min-h-dvh flex-col items-center justify-center py-32 text-center">
	<p class="mb-2 text-xs tracking-[0.2em] text-accent uppercase">Storm passes, coffee stays</p>
	<h1 class="text-4xl text-ink sm:text-6xl">Lost in the clouds</h1>
	<p class="mx-auto mt-4 max-w-md text-ink/70">
		That page isn't here. The cafe still is: {config.contact.address.lines.join(', ')}.
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a class="rounded-full bg-accent px-5 py-2 text-cream" href={resolve('/')}>Back to the garden</a
		>
		<a class="rounded-full border border-ink/20 px-5 py-2 text-ink" href={resolve('/menu')}
			>The menu</a
		>
	</div>
</div>
