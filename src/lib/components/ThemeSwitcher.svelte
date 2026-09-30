<script lang="ts">
	import { theme, options } from '$lib/theme.svelte';

	// Dev-only panel for trying design decisions by eye. Enabled by theme.switcher in site.config.ts.
	let open = $state(true);

	const rows = $derived([
		{ key: 'accent', label: 'Accent', value: theme.accent },
		{ key: 'surface', label: 'Surface', value: theme.surface },
		{ key: 'header', label: 'Header', value: theme.header },
		{ key: 'photo', label: 'Photo', value: theme.photo },
		{ key: 'text', label: 'Text', value: theme.text },
		{ key: 'board', label: 'Board', value: theme.board },
		{ key: 'memory', label: 'Memory', value: theme.memory },
		{ key: 'sunsetPhoto', label: 'Sunset', value: theme.sunsetPhoto },
		{ key: 'sky', label: 'Sky', value: theme.sky }
	] as const);
</script>

<aside
	class="fixed bottom-4 left-4 z-50 rounded-xl border border-ink/15 bg-cream/90 text-xs text-ink shadow-lg backdrop-blur"
	aria-label="Theme switcher"
>
	<button
		type="button"
		class="flex w-full items-center justify-between gap-6 px-3 py-2 font-semibold"
		onclick={() => (open = !open)}
		aria-expanded={open}
	>
		<span>Theme lab</span>
		<span aria-hidden="true">{open ? '–' : '+'}</span>
	</button>
	{#if open}
		<div class="space-y-2 px-3 pb-3">
			{#each rows as row (row.key)}
				<div class="flex items-center gap-2">
					<span class="w-14 text-ink/60">{row.label}</span>
					<div class="flex gap-1">
						{#each options[row.key] as opt (opt)}
							<button
								type="button"
								class={[
									'rounded-full border px-2 py-0.5 capitalize',
									row.value === opt ? 'border-accent bg-accent text-cream' : 'border-ink/20'
								]}
								onclick={() => theme.set({ [row.key]: opt })}
							>
								{opt}
							</button>
						{/each}
					</div>
				</div>
			{/each}
			<div class="flex items-center gap-3 pt-1">
				<span class="flex items-center gap-1">
					{#each ['clay', 'wood', 'brick', 'table', 'log', 'periwinkle', 'moss', 'leaf', 'silver', 'cream'] as c (c)}
						<span
							class="size-4 rounded-full border border-ink/10"
							style={`background: var(--sl-${c})`}
							title={c}
						></span>
					{/each}
				</span>
				<button type="button" class="ml-auto text-ink/60 underline" onclick={() => theme.reset()}>
					reset
				</button>
			</div>
		</div>
	{/if}
</aside>
