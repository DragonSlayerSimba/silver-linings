<script lang="ts">
	import config from '$config';
	import MenuBoard from '$lib/components/menu/MenuBoard.svelte';

	// The full menu on its own page: the QR code at the counter can point here, and it prints clean.
</script>

<svelte:head>
	<title>Menu · {config.name}</title>
	<meta
		name="description"
		content={`What's on the boards at ${config.name}, ${config.contact.address.lines[0]}.`}
	/>
</svelte:head>

<div class="container-sl pt-28 pb-20 sm:pt-32 sm:pb-28">
	<header class="mb-10 text-center">
		<p class="mb-2 text-xs tracking-[0.2em] text-accent uppercase">Sip. Savor. Smile.</p>
		<h1 class="text-4xl text-ink sm:text-6xl">The menu</h1>
		<p class="mx-auto mt-3 max-w-lg text-ink/70">
			Same boards as on the wall, minus the chalk dust.
		</p>
	</header>
	<MenuBoard />
</div>
