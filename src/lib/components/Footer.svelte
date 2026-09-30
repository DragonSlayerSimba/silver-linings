<script lang="ts">
	import config from '$config';
	import { season, seasons, seasonLabel } from '$lib/season.svelte';
	import { hoursLabel, closedDaysLabel } from '$lib/utils';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-ink/10 py-10 text-sm text-ink/70">
	<div class="container-sl flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<p class="font-display text-lg text-ink">{config.name}</p>
			<p>{hoursLabel()} · {closedDaysLabel()}</p>
			<p>{config.contact.address.lines.join(', ')}</p>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<span class="mr-1">Mood</span>
			{#each seasons as s (s)}
				<button
					type="button"
					class={[
						'rounded-full border px-3 py-1 transition',
						season.current === s ? 'border-accent text-accent' : 'border-ink/20'
					]}
					onclick={() => season.set(s)}
				>
					{seasonLabel(s)}
				</button>
			{/each}
		</div>
	</div>
	<p class="container-sl mt-6 text-xs text-ink/50">© {year} {config.name}. Made in Bir.</p>
</footer>
