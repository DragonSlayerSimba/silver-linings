<script lang="ts">
	/**
	 * Line icons for the phone header, keyed by `phoneIcon` in site.config.ts.
	 * Same 24px grid and stroke as CategoryIcon so the two sets read as one family.
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
	class={cls}
>
	{#if name === 'cup'}
		<path d="M4 10h13v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z" />
		<path d="M17 11.5h1.5a2.5 2.5 0 0 1 0 5H16.5" />
		<path d="M8.5 7c0-1.2 1-1.2 1-2.5M12 7c0-1.2 1-1.2 1-2.5" />
	{:else if name === 'calendar'}
		<rect x="3.5" y="5" width="17" height="15" rx="2.5" />
		<path d="M3.5 9.5h17M8 3v4M16 3v4" />
		<path d="M12 12.3l1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.5 2.2-.3z" />
	{:else if name === 'pin'}
		<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
		<circle cx="12" cy="9.5" r="2.5" />
	{:else if name === 'bag'}
		<path d="M5 8h14l-1 12H6z" />
		<path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
	{:else if name === 'camera'}
		<path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
		<circle cx="12" cy="13.5" r="3.5" />
	{:else if name === 'clock'}
		<circle cx="12" cy="12" r="8.5" />
		<path d="M12 7.5V12l3 2" />
	{/if}
</svg>
