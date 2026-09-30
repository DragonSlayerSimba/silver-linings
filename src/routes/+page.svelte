<script lang="ts">
	import config from '$config';
	import type { SectionId } from '$lib/config/schema';
	import type { Component } from 'svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Menu from '$lib/components/sections/Menu.svelte';
	import MemoryLane from '$lib/components/sections/MemoryLane.svelte';
	import Social from '$lib/components/sections/Social.svelte';
	import Shop from '$lib/components/sections/Shop.svelte';
	import Events from '$lib/components/sections/Events.svelte';
	import FindUs from '$lib/components/sections/FindUs.svelte';

	// Section order and visibility come from site.config.ts.
	const registry: Record<SectionId, Component> = {
		hero: Hero,
		menu: Menu,
		'memory-lane': MemoryLane,
		social: Social,
		shop: Shop,
		events: Events,
		'find-us': FindUs
	};

	const sections = config.sections.filter((s) => s.enabled);
</script>

{#each sections as s (s.id)}
	{@const Section = registry[s.id]}
	<Section />
{/each}
