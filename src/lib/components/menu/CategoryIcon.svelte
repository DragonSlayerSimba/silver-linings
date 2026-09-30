<script lang="ts">
	/**
	 * Line icons for menu categories, keyed by the `icon` field in menu.ts.
	 * Steam and bubbles move gently; Rive versions can replace these one at a
	 * time later by matching the same keys.
	 */
	let { name, class: cls = '' }: { name: string; class?: string } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.6"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	class={['icon', cls]}
>
	{#if name === 'eggs'}
		<path d="M4 13c0-4.5 3.5-8 8-8.5S20.5 7 20 11.5 17 19 12.5 19.5 4 17.5 4 13z" />
		<circle cx="11" cy="12" r="2.8" />
	{:else if name === 'pancakes'}
		<ellipse cx="12" cy="8.5" rx="8" ry="3" />
		<path d="M4 8.5v3c0 1.7 3.6 3 8 3s8-1.3 8-3v-3" />
		<path d="M4 11.5v3c0 1.7 3.6 3 8 3s8-1.3 8-3v-3" />
		<path d="M10 6.5h4v2h-4z" />
		<path class="drip" d="M7 11.2v2.4" />
	{:else if name === 'bowl'}
		<path d="M3 11h18a9 9 0 0 1-18 0z" />
		<path d="M8 20h8" />
		<path d="M5 8c2-2 4-2 6-1s4 1 6-1" />
	{:else if name === 'soup'}
		<path d="M3 12h18a9 9 0 0 1-18 0z" />
		<path d="M8 20h8" />
		<path class="steam s1" d="M9 8c0-1.5 1-1.5 1-3" />
		<path class="steam s2" d="M12.5 8c0-1.5 1-1.5 1-3" />
		<path class="steam s3" d="M16 8c0-1.5 1-1.5 1-3" />
	{:else if name === 'salad'}
		<path d="M20 4C10 4 5 9 4 20c10-1 15-6 16-16z" />
		<path d="M4 20 18 6" />
		<path d="M9 15c2 0 3-1 4-3" />
	{:else if name === 'sandwich'}
		<path d="M3 18 12 5l9 13z" />
		<path d="M6.5 16.5 12 8.5l5.5 8" />
		<path d="M3 18h18" />
	{:else if name === 'burger'}
		<path d="M4 10a8 5 0 0 1 16 0z" />
		<path d="M3.5 13h17" />
		<path d="M5 16h14a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3z" />
		<path d="M9 7h.01M12 6h.01M15 7h.01" stroke-width="2" />
	{:else if name === 'pasta'}
		<path d="M7 3v5M9 3v5M11 3v5M7 8a2 2 0 0 0 4 0M9 10v11" />
		<ellipse cx="16" cy="16" rx="5" ry="3" />
		<path d="M12.5 14.5c1.5-1.5 5.5-1.5 7 0" />
	{:else if name === 'pizza'}
		<path d="M12 3 3 20h18z" />
		<path d="M5 16c4-2 10-2 14 0" />
		<circle cx="11" cy="12" r="1.2" />
		<circle cx="14" cy="16" r="1.2" />
		<circle cx="8.5" cy="17" r="1" />
	{:else if name === 'coffee'}
		<path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
		<path d="M16 10h2a2 2 0 0 1 0 4h-2" />
		<path d="M5 22h12" />
		<path class="steam s1" d="M8 6c0-1.5 1-1.5 1-3" />
		<path class="steam s2" d="M12 6c0-1.5 1-1.5 1-3" />
	{:else if name === 'tea'}
		<path d="M5 10h11v4a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 14z" />
		<path d="M16 11h1.5a2 2 0 0 1 0 4H16" />
		<path d="M3 21h16" />
		<path class="steam s1" d="M8.5 7c0-1.5 1-1.5 1-3" />
		<path class="steam s2" d="M12 7c0-1.5 1-1.5 1-3" />
	{:else if name === 'cooler'}
		<path d="M7 4h10l-1 16H8z" />
		<path d="M13.5 2.5 17 8" />
		<path d="M7.6 11h8.8" />
		<circle class="bubble b1" cx="10.5" cy="16" r="0.9" />
		<circle class="bubble b2" cx="13" cy="14" r="0.7" />
	{:else if name === 'smoothie'}
		<path d="M6 5h12l-1.5 15h-9z" />
		<path d="M14 2.5 16 6" />
		<path d="M7 10c1.5-1 3.3-1 5 0s3.5 1 5 0" />
		<circle class="bubble b1" cx="10" cy="15.5" r="0.8" />
		<circle class="bubble b2" cx="13.5" cy="13.5" r="0.7" />
	{:else if name === 'cake'}
		<path d="M4 12 12 4l8 8v8H4z" />
		<path d="M4 16h16" />
		<path d="M8 12h8" />
		<circle cx="12" cy="7.5" r="1" />
	{:else}
		<circle cx="12" cy="12" r="8" />
	{/if}
</svg>

<style>
	.icon {
		width: 1.5em;
		height: 1.5em;
		overflow: visible;
	}
	.steam {
		animation: steam 2.6s ease-in-out infinite;
		transform-origin: center bottom;
	}
	.s2 {
		animation-delay: -0.9s;
	}
	.s3 {
		animation-delay: -1.7s;
	}
	.bubble {
		animation: bubble 3s ease-in-out infinite;
	}
	.b2 {
		animation-delay: -1.4s;
	}
	.drip {
		animation: drip 3.2s ease-in-out infinite;
	}
	@keyframes steam {
		0%,
		100% {
			opacity: 0.35;
			transform: translateY(0);
		}
		50% {
			opacity: 1;
			transform: translateY(-1.2px);
		}
	}
	@keyframes bubble {
		0% {
			opacity: 0;
			transform: translateY(2px);
		}
		40%,
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translateY(-3px);
		}
	}
	@keyframes drip {
		0%,
		60%,
		100% {
			transform: scaleY(0.4);
			transform-origin: top;
		}
		80% {
			transform: scaleY(1.4);
			transform-origin: top;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.steam,
		.bubble,
		.drip {
			animation: none;
		}
	}
</style>
